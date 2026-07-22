import type { ImageMetadata } from "astro";
import { getColor } from "colorthief";

interface ImageWithFsPath extends ImageMetadata {
	fsPath?: string;
}

const FALLBACK_COLOR = "var(--color-muted)";

export async function getDominantColor(image: ImageWithFsPath): Promise<string> {
	const source = image.fsPath;
	if (!source) {
		return FALLBACK_COLOR;
	}

	try {
		const color = await getColor(source);
		if (!color) {
			return FALLBACK_COLOR;
		}
		return color.css();
	} catch {
		return FALLBACK_COLOR;
	}
}
