import { getImage } from "astro:assets";

const allImages = import.meta.glob<{ default: ImageMetadata }>(["../assets/**/*.{jpeg,jpg,png,gif}"]);

interface WithImage {
	imageUrl: string; // caminho relativo dentro de assets, ex: "about/avatar.png"
}

export async function optimizeCompactImage(relativePath: string) {
	const imagePath = `../assets/${relativePath}`;
	const loadModule = allImages[imagePath];

	if (!loadModule) {
		throw new Error(`Image not found for path: ${imagePath}`);
	}

	const imageModule = await loadModule();

	const compactImage = await getImage({
		src: imageModule.default,
		width: 200,
		format: "webp",
		quality: 90,
	});

	return compactImage.src;
}

export async function optimizeImage(relativePath: string) {
	const imagePath = `../assets/${relativePath}`;
	const loadModule = allImages[imagePath];

	if (!loadModule) {
		throw new Error(`Image not found for path: ${imagePath}`);
	}

	const imageModule = await loadModule();

	const fullImage = await getImage({
		src: imageModule.default,
		width: 700,
		height: 500,
		format: "webp",
		quality: 70,
	});

	return fullImage.src;
}

export async function optimizeImageBulk<T extends WithImage>(items: T[]): Promise<T[]> {
	return await Promise.all(
		items.map(async (item) => {
			const optimizedUrl = await optimizeImage(item.imageUrl);

			return { ...item, imageUrl: optimizedUrl };
		}),
	);
}
