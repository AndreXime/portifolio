import { getSecret } from "astro:env/server";
import type {
	AggregatedStats,
	ContributionDay,
	ContributionWeek,
	GraphQLResponse,
	RepositoryNode,
	StatsGlobal,
} from "./types";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const MAX_LANGUAGES = 4;
const GITHUB_TOKEN = getSecret("GITHUB_ACCESS_TOKEN");

function currentYearStartIso(): string {
	const year = new Date().getUTCFullYear();
	return `${year}-01-01T00:00:00Z`;
}

function oneYearAgoIso(): string {
	const date = new Date();
	date.setUTCFullYear(date.getUTCFullYear() - 1);
	return date.toISOString();
}

function todayUtcDate(): string {
	return new Date().toISOString().slice(0, 10);
}

function flattenContributionDays(weeks: ContributionWeek[]): ContributionDay[] {
	return weeks.flatMap((week) => week.contributionDays);
}

function calculateLongestStreak(days: ContributionDay[]): number {
	const sorted = [...days].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	let longest = 0;
	let current = 0;

	for (const day of sorted) {
		if (day.contributionCount === 0) {
			current = 0;
			continue;
		}

		current += 1;
		if (current > longest) {
			longest = current;
		}
	}

	return longest;
}

function calculateCurrentStreak(days: ContributionDay[]): number {
	const sorted = [...days].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	if (sorted.length === 0) {
		return 0;
	}

	const today = todayUtcDate();
	let startIndex = 0;

	if (sorted[0].date === today && sorted[0].contributionCount === 0) {
		startIndex = 1;
	}

	let streak = 0;
	let previousDate: Date | null = null;

	for (let i = startIndex; i < sorted.length; i++) {
		const day = sorted[i];

		if (day.contributionCount === 0) {
			break;
		}

		const date = new Date(day.date);

		if (previousDate !== null) {
			const diffDays = (previousDate.getTime() - date.getTime()) / 86_400_000;
			if (diffDays !== 1) {
				break;
			}
		}

		streak += 1;
		previousDate = date;
	}

	return streak;
}

function calculateActiveDays(days: ContributionDay[]): number {
	return days.filter((day) => day.contributionCount > 0).length;
}

async function fetchGitHubGraphQL<T>(query: string, variables: Record<string, unknown>): Promise<T> {
	const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${GITHUB_TOKEN}`,
			"User-Agent": "portfolio-stats-script",
		},
		body: JSON.stringify({ query, variables }),
	});

	if (!response.ok) {
		throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
	}

	const result = (await response.json()) as { data: T; errors?: Array<{ message: string }> };
	if (result.errors?.length) {
		throw new Error(`Erro GraphQL: ${result.errors[0].message}`);
	}

	return result.data;
}

function aggregateLanguages(repositories: { nodes: RepositoryNode[] }): AggregatedStats["languages"] {
	const languageMap: Record<string, { color: string; bytes: number }> = {};
	let totalBytesGlobais = 0;

	for (const repo of repositories.nodes) {
		for (const edge of repo.languages.edges) {
			const langName = edge.node.name;
			const langColor = edge.node.color ?? "#cccccc";
			const bytes = edge.size;

			totalBytesGlobais += bytes;

			if (!languageMap[langName]) {
				languageMap[langName] = { color: langColor, bytes: 0 };
			}
			languageMap[langName].bytes += bytes;
		}
	}

	const sortedLanguages = Object.entries(languageMap)
		.map(([name, info]) => ({
			name,
			color: info.color,
			bytes: info.bytes,
			percentage: totalBytesGlobais > 0 ? Number(((info.bytes / totalBytesGlobais) * 100).toFixed(1)) : 0,
		}))
		.sort((a, b) => b.bytes - a.bytes);

	const mainLanguages = sortedLanguages.slice(0, MAX_LANGUAGES);
	const leftoverLanguages = sortedLanguages.slice(MAX_LANGUAGES);

	if (leftoverLanguages.length > 0) {
		const totalLeftoverPercentage = leftoverLanguages.reduce((acc, curr) => acc + curr.percentage, 0);
		const totalLeftoverBytes = leftoverLanguages.reduce((acc, curr) => acc + curr.bytes, 0);

		mainLanguages.push({
			name: "Outras",
			color: "#4b5563",
			bytes: totalLeftoverBytes,
			percentage: Number(totalLeftoverPercentage.toFixed(1)),
		});
	}

	return mainLanguages;
}

export async function getGitHubFullStats(): Promise<AggregatedStats> {
	const activityFrom = oneYearAgoIso();
	const commitsFrom = currentYearStartIso();

	const query = `
    query($commitsFrom: DateTime!, $activityFrom: DateTime!) {
      viewer {
        yearCommits: contributionsCollection(from: $commitsFrom) {
          totalCommitContributions
          restrictedContributionsCount
        }
        activityWindow: contributionsCollection(from: $activityFrom) {
          totalCommitContributions
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
        publicRepos: repositories(
          first: 100
          ownerAffiliations: OWNER
          privacy: PUBLIC
          isFork: false
        ) {
          nodes {
            name
            languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
        privateRepos: repositories(
          first: 100
          ownerAffiliations: OWNER
          privacy: PRIVATE
          isFork: false
        ) {
          nodes {
            name
            languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  `;

	const data = await fetchGitHubGraphQL<GraphQLResponse["data"]>(query, {
		commitsFrom,
		activityFrom,
	});

	const { yearCommits, activityWindow, publicRepos, privateRepos } = data.viewer;
	const contributionDays = flattenContributionDays(activityWindow.contributionCalendar.weeks);
	const ownedRepositories = {
		nodes: [...publicRepos.nodes, ...privateRepos.nodes],
	};

	return {
		period: {
			activityFrom,
			commitsFrom,
		},
		activity: {
			activeDays: calculateActiveDays(contributionDays),
			commits: activityWindow.totalCommitContributions,
		},
		streak: {
			current: calculateCurrentStreak(contributionDays),
			longest: calculateLongestStreak(contributionDays),
		},
		commits: {
			public: yearCommits.totalCommitContributions,
			private: yearCommits.restrictedContributionsCount,
			total: yearCommits.totalCommitContributions + yearCommits.restrictedContributionsCount,
		},
		languages: aggregateLanguages(ownedRepositories),
	};
}

export async function getCachedGitHubStats(): Promise<AggregatedStats | null> {
	const globalStore = globalThis as StatsGlobal;

	const cached =
		globalStore.__portfolioGitHubStatsCache !== undefined
			? globalStore.__portfolioGitHubStatsCache
			: globalStore.__portfolioGitHubStatsPromise;

	if (cached !== undefined) {
		return cached;
	}

	if (!GITHUB_TOKEN) {
		console.warn("[github stats] GITHUB_ACCESS_TOKEN ausente; seção omitida.");
		globalStore.__portfolioGitHubStatsCache = null;
		return null;
	}

	globalStore.__portfolioGitHubStatsPromise = getGitHubFullStats()
		.then((data) => {
			globalStore.__portfolioGitHubStatsCache = data;
			return data;
		})
		.catch((error: unknown) => {
			console.warn("[github stats] Falha ao buscar dados:", error);
			globalStore.__portfolioGitHubStatsCache = null;
			return null;
		})
		.finally(() => {
			globalStore.__portfolioGitHubStatsPromise = undefined;
		});

	return globalStore.__portfolioGitHubStatsPromise;
}
