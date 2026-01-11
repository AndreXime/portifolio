import { getImage } from "astro:assets";

interface WithImage {
	imageUrl: string;
}
/**
 * Aceita qualquer array de objetos com propriedade imageUrl
 * Aplica otimização das imagens na build
 */
export async function optimizeImages<T extends WithImage>(items: T[], assetFolder: string): Promise<T[]> {
	const allImages = import.meta.glob<{ default: ImageMetadata }>("../assets/**/*.{jpeg,jpg,png,gif}");

	return await Promise.all(
		items.map(async (item) => {
			const imagePath = `../assets/${assetFolder}/${item.imageUrl}`;
			const imageModule = await allImages[imagePath]();

			const optimized = await getImage({
				src: imageModule.default,
				width: 800,
				format: "webp",
				quality: 80,
			});

			return { ...item, imageUrl: optimized.src };
		}),
	);
}
