type InitOptions = {
	firstSnippetCode: string;
	firstSnippetHtml: string;
	firstSnippetOutput: string;
};

export default function initCodeSnippet(options: InitOptions) {
	const { firstSnippetCode, firstSnippetHtml, firstSnippetOutput } = options;

	const tabs = document.querySelectorAll<HTMLElement>("[data-snippet-tab]");
	const panels = document.querySelectorAll<HTMLElement>("[data-snippet-panel]");

	function setActiveTab(activeKey: string) {
		tabs.forEach((tab) => {
			const isActive = tab.dataset.snippetTab === activeKey;
			tab.setAttribute("aria-selected", String(isActive));
			tab.classList.toggle("snippet-tab-active", isActive);
		});
		panels.forEach((panel) => {
			const panelKey = panel.getAttribute("data-snippet-panel");
			panel.classList.toggle("hidden", panelKey !== activeKey);
		});
	}

	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			const key = tab.getAttribute("data-snippet-tab");
			if (key) setActiveTab(key);
		});
	});

	const typewriterPre = document.querySelector<HTMLPreElement>("pre[data-typewriter]");
	const terminal = document.querySelector<HTMLElement>("[data-terminal]");
	const terminalCommand = document.querySelector<HTMLElement>('[data-terminal-line="command"]');
	const terminalOutput = document.querySelector<HTMLElement>('[data-terminal-line="output"]');

	function escapeHtml(value: string) {
		return value.replace(/[&<>]/g, (char) => {
			if (char === "&") return "&amp;";
			if (char === "<") return "&lt;";
			if (char === ">") return "&gt;";
			return char;
		});
	}

	function startTerminal() {
		if (!terminal || !terminalCommand || !terminalOutput) return;

		const safeTerminalOutput = terminalOutput;

		const command = `npx tsx main.ts`;
		const output =
			typeof firstSnippetOutput === "string" && firstSnippetOutput.length > 0
				? firstSnippetOutput
				: "Andre Ximenes is ready to ship!";

		const promptHtml = '<span class="terminal-prompt">$</span>';

		let step: "command" | "output" = "command";
		let index = 0;
		const speed = 30;

		const safeTerminalCommand = terminalCommand;

		function renderCommandFrame(text: string) {
			const keyword = "npx";
			const typedKeywordLength = Math.min(text.length, keyword.length);

			const keywordPart = text.slice(0, typedKeywordLength);
			const restPart = text.slice(typedKeywordLength);

			const keywordHtml = keywordPart ? `<span class="terminal-keyword">${escapeHtml(keywordPart)}</span>` : "";
			const restHtml = escapeHtml(restPart);

			safeTerminalCommand.innerHTML = `${promptHtml} ${keywordHtml}${restHtml}<span class="typewriter-cursor" aria-hidden="true">|</span>`;
		}

		function renderOutputFrame(text: string) {
			safeTerminalOutput.textContent = text;
		}

		function tick() {
			if (step === "command") {
				if (index <= command.length) {
					renderCommandFrame(command.slice(0, index));
					index += 1;
					window.setTimeout(tick, speed);
					return;
				}

				const fullKeyword = `<span class="terminal-keyword">${escapeHtml("npx")}</span>`;
				const fullRest = escapeHtml(command.slice(3));
				safeTerminalCommand.innerHTML = `${promptHtml} ${fullKeyword}${fullRest}`;
				step = "output";
				index = 0;
				window.setTimeout(tick, 260);
				return;
			}

			if (step === "output") {
				if (index <= output.length) {
					renderOutputFrame(output.slice(0, index));
					index += 1;
					window.setTimeout(tick, speed);
				}
			}
		}

		terminal.classList.add("terminal-shell--visible");
		window.setTimeout(tick, 320);
	}

	if (typewriterPre && firstSnippetCode && firstSnippetHtml) {
		const safeTypewriterPre = typewriterPre;
		const speed = 28;
		const startDelay = 1000;

		const htmlLines = firstSnippetHtml.split("\n");

		let globalIndex = 0;
		let currentLineIndex = 0;
		let buffer = "";

		function renderFrame() {
			const completedHtml = currentLineIndex > 0 ? htmlLines.slice(0, currentLineIndex).join("\n") : "";
			const escapedBuffer = buffer ? `<span class="plain-line">${escapeHtml(buffer)}</span>` : "";
			const cursorHtml = '<span class="typewriter-cursor" aria-hidden="true">|</span>';

			const pieces: string[] = [];
			if (completedHtml) pieces.push(completedHtml);
			if (escapedBuffer || cursorHtml) {
				pieces.push(`${escapedBuffer}${cursorHtml}`);
			}

			safeTypewriterPre.innerHTML = pieces.join("\n");
		}

		function type() {
			if (globalIndex >= firstSnippetCode.length) {
				safeTypewriterPre.innerHTML = firstSnippetHtml;
				safeTypewriterPre.classList.remove("typewriter-pre");
				startTerminal();
				return;
			}

			const char = firstSnippetCode[globalIndex];
			globalIndex += 1;

			if (char === "\n") {
				buffer = "";
				currentLineIndex = Math.min(currentLineIndex + 1, htmlLines.length);
			} else {
				buffer += char;
			}

			renderFrame();
			window.setTimeout(type, speed);
		}

		window.setTimeout(type, startDelay);
		renderFrame();
	}
}
