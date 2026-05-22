export interface LanguageNode {
	size: number;
	node: {
		name: string;
		color: string | null;
	};
}

export interface RepositoryNode {
	name: string;
	languages: {
		edges: LanguageNode[];
	};
}

export interface ContributionDay {
	date: string;
	contributionCount: number;
}

export interface ContributionWeek {
	contributionDays: ContributionDay[];
}

export interface ContributionsCollection {
	totalCommitContributions: number;
	restrictedContributionsCount: number;
	contributionCalendar: {
		weeks: ContributionWeek[];
	};
}

export interface GraphQLResponse {
	data: {
		viewer: {
			yearCommits: Pick<ContributionsCollection, "totalCommitContributions" | "restrictedContributionsCount">;
			activityWindow: ContributionsCollection;
			publicRepos: { nodes: RepositoryNode[] };
			privateRepos: { nodes: RepositoryNode[] };
		};
	};
	errors?: Array<{ message: string }>;
}

export interface AggregatedStats {
	period: {
		activityFrom: string;
		commitsFrom: string;
	};
	activity: {
		activeDays: number;
		commits: number;
	};
	streak: {
		current: number;
		longest: number;
	};
	commits: {
		public: number;
		private: number;
		total: number;
	};
	languages: Array<{
		name: string;
		color: string;
		bytes: number;
		percentage: number;
	}>;
}

export type StatsGlobal = typeof globalThis & {
	__portfolioGitHubStatsCache?: AggregatedStats | null;
	__portfolioGitHubStatsPromise?: Promise<AggregatedStats | null>;
};
