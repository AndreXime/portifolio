const MIN_SUBMIT_MS = 3000;

const FALLBACK_MESSAGES = {
	errorGeneric: "Não foi possível enviar. Tente de novo em instantes.",
	errorTooFast: "Aguarde alguns segundos antes de enviar.",
	errorNetwork: "Falha de rede. Verifique sua conexão e tente novamente.",
	success: "Mensagem enviada. Obrigado — respondo em até um dia útil.",
	submitting: "Enviando…",
	submit: "Enviar mensagem",
} as const;

const MESSAGE_DATASET_KEYS = {
	errorGeneric: "msgErrorGeneric",
	errorTooFast: "msgErrorFast",
	errorNetwork: "msgErrorNetwork",
	success: "msgSuccess",
	submitting: "msgSubmitting",
	submit: "msgSubmit",
} as const satisfies Record<keyof typeof FALLBACK_MESSAGES, keyof DOMStringMap>;

function readFormMessage(form: HTMLFormElement, key: keyof typeof FALLBACK_MESSAGES): string {
	const value = form.dataset[MESSAGE_DATASET_KEYS[key]];
	return value?.trim() || FALLBACK_MESSAGES[key];
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
	const defaultLabel = labelEl?.textContent?.trim() ?? FALLBACK_MESSAGES.submit;

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
			labelEl.textContent = readFormMessage(form, "submitting");
		}
		setStatus("", "");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, message, website: honeypot, _ts: loadedAt }),
			});
			const data = await res.json().catch(() => ({}));

			if (!res.ok) {
				let errorMessage = readFormMessage(form, "errorGeneric");

				if (typeof data?.error === "string") {
					errorMessage = data.error;
				}

				setStatus(errorMessage, "error");
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
