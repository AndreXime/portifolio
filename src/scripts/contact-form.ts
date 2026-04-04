function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function parseErrorMessage(data: unknown): string {
	const fallback = "Não foi possível enviar. Tente de novo em instantes.";
	if (!isRecord(data) || typeof data.error !== "string") {
		return fallback;
	}
	return data.error;
}

function initContactForm(): void {
	const form = document.getElementById("contact-form");
	const statusEl = document.getElementById("contact-form-status");
	if (!(form instanceof HTMLFormElement) || !statusEl) {
		return;
	}

	const labelEl = form.querySelector("[data-contact-submit-label]");
	const defaultLabel = labelEl?.textContent?.trim() ?? "Enviar mensagem";

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
		const name = String(fd.get("name") ?? "").trim();
		const email = String(fd.get("email") ?? "").trim();
		const message = String(fd.get("message") ?? "").trim();

		const submitBtn = form.querySelector('button[type="submit"]');
		if (submitBtn instanceof HTMLButtonElement) {
			submitBtn.disabled = true;
		}
		if (labelEl) {
			labelEl.textContent = "Enviando…";
		}
		setStatus("", "");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, message }),
			});
			const data: unknown = await res.json().catch(() => ({}));

			if (!res.ok) {
				setStatus(parseErrorMessage(data), "error");
				return;
			}

			setStatus("Mensagem enviada. Obrigado — respondo em até um dia útil.", "success");
			form.reset();
		} catch {
			setStatus("Falha de rede. Verifique sua conexão e tente novamente.", "error");
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

initContactForm();
