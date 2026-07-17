const MIN_SUBMIT_MS = 3000;

type ContactMessageKey =
	| "errorGeneric"
	| "errorTooFast"
	| "errorNetwork"
	| "errorRateLimit"
	| "success"
	| "submitting"
	| "submit";

const MESSAGE_DATASET_KEYS = {
	errorGeneric: "msgErrorGeneric",
	errorTooFast: "msgErrorFast",
	errorNetwork: "msgErrorNetwork",
	errorRateLimit: "msgErrorRateLimit",
	success: "msgSuccess",
	submitting: "msgSubmitting",
	submit: "msgSubmit",
} as const satisfies Record<ContactMessageKey, keyof DOMStringMap>;

const API_ERROR_MESSAGE_KEYS = {
	rate_limit: "errorRateLimit",
	validation: "errorGeneric",
	spam: "errorGeneric",
	config: "errorGeneric",
	server: "errorGeneric",
} as const satisfies Record<string, ContactMessageKey>;

function readFormMessage(form: HTMLFormElement, key: ContactMessageKey): string {
	return form.dataset[MESSAGE_DATASET_KEYS[key]]?.trim() ?? "";
}

function resolveApiErrorMessage(form: HTMLFormElement, data: unknown): string {
	const code =
		typeof data === "object" && data !== null && "error" in data && typeof data.error === "string" ? data.error : "";
	const messageKey =
		code in API_ERROR_MESSAGE_KEYS
			? API_ERROR_MESSAGE_KEYS[code as keyof typeof API_ERROR_MESSAGE_KEYS]
			: "errorGeneric";
	return readFormMessage(form, messageKey);
}

export function initContactForm(): void {
	const form = document.getElementById("contact-form");
	const statusEl = document.getElementById("contact-form-status");
	if (!(form instanceof HTMLFormElement) || !statusEl) {
		return;
	}

	const tsInput = form.querySelector<HTMLInputElement>("[data-contact-ts]");
	if (tsInput) {
		tsInput.value = String(Date.now());
	}

	const labelEl = form.querySelector("[data-contact-submit-label]");
	const defaultLabel = labelEl?.textContent?.trim() || readFormMessage(form, "submit");
	const locale = form.dataset.locale?.trim() || "pt";

	const setStatus = (message: string, kind: "" | "error" | "success") => {
		statusEl.textContent = message;
		statusEl.classList.toggle("hidden", message.length === 0);
		statusEl.classList.remove("text-accent", "text-red-400");
		if (kind === "error") {
			statusEl.classList.add("text-red-400");
		} else if (kind === "success") {
			statusEl.classList.add("text-accent");
		}
	};

	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		const fd = new FormData(form);
		const honeypot = String(fd.get("website") ?? "").trim();
		if (honeypot.length > 0) {
			setStatus(readFormMessage(form, "errorGeneric"), "error");
			return;
		}

		const loadedAt = Number(fd.get("_ts"));
		if (!Number.isFinite(loadedAt) || Date.now() - loadedAt < MIN_SUBMIT_MS) {
			setStatus(readFormMessage(form, "errorTooFast"), "error");
			return;
		}

		const name = String(fd.get("name") ?? "").trim();
		const email = String(fd.get("email") ?? "").trim();
		const message = String(fd.get("message") ?? "").trim();

		const submitBtn = form.querySelector('button[type="submit"]');
		if (submitBtn instanceof HTMLButtonElement) {
			submitBtn.disabled = true;
		}
		if (labelEl) {
			labelEl.textContent = readFormMessage(form, "submitting") || defaultLabel;
		}
		setStatus("", "");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					email,
					message,
					website: honeypot,
					_ts: loadedAt,
					locale,
				}),
			});
			const data: unknown = await res.json().catch(() => ({}));

			if (!res.ok) {
				setStatus(resolveApiErrorMessage(form, data), "error");
				return;
			}

			setStatus(readFormMessage(form, "success"), "success");
			form.reset();
			if (tsInput) {
				tsInput.value = String(Date.now());
			}
		} catch {
			setStatus(readFormMessage(form, "errorNetwork"), "error");
		} finally {
			if (submitBtn instanceof HTMLButtonElement) {
				submitBtn.disabled = false;
			}
			if (labelEl) {
				labelEl.textContent = defaultLabel;
			}
		}
	});
}
