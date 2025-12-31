import type { Book } from "@/content/books";
import type { Project } from "@/content/projects";
import { getImage } from "astro:assets";

export async function optimizeProjectsImages(Projects: Project[]): Promise<Project[]> {
  const projectImages = import.meta.glob<{ default: ImageMetadata }>("../assets/projetos/*.{jpeg,jpg,png,gif}");

  return await Promise.all(
    Projects.map(async (project) => {
      const imagePath = `../assets/projetos/${project.imageUrl}`;
      const imageModule = await projectImages[imagePath]();
      const optimized = await getImage({
        src: imageModule.default,
        width: 800,
        format: "webp",
        quality: 80,
      });
      return { ...project, imageUrl: optimized.src };
    })
  );
}

export async function optimizeBooksImages(Books: Book[]): Promise<Book[]> {
  const bookImages = import.meta.glob<{ default: ImageMetadata }>("../assets/livros/*.{jpeg,jpg,png,gif}");

  return await Promise.all(
    Books.map(async (book) => {
      const imagePath = `../assets/livros/${book.imageUrl}`;
      const imageModule = await bookImages[imagePath]();

      const optimized = await getImage({
        src: imageModule.default,
        width: 800,
        format: "webp",
        quality: 80,
      });

      return {
        ...book,
        imageUrl: optimized.src,
      };
    })
  );
}
