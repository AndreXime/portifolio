import { Loader2 } from "lucide-preact";
import { useEffect, useRef, useState } from "preact/hooks";

type ImageLoaderProps = {
	src: string;
	alt: string;
	width: number;
	height: number;
	href?: string | null;
	linkLabel?: string;
	className?: string;
};

export default function ImageLoader({ src, alt, width, height, href, linkLabel, className }: ImageLoaderProps) {
	const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (imgRef.current?.complete) {
			setStatus("loaded");
		}
	}, []);

	const imgClassName = `${className ?? ""} transition-opacity duration-300 ${
		status === "loaded" ? "opacity-100" : "opacity-0"
	}`.trim();

	const img = (
		<img
			ref={imgRef}
			src={src}
			width={width}
			height={height}
			alt={alt}
			loading="lazy"
			decoding="async"
			onLoad={() => setStatus("loaded")}
			onError={() => setStatus("error")}
			className={imgClassName}
		/>
	);

	return (
		<div className="absolute inset-0 contents h-full overflow-hidden">
			{status !== "loaded" && (
				<div className="absolute inset-0 z-10 flex items-center justify-center bg-surfaceAlt">
					{status === "loading" ? (
						<Loader2 className="h-6 w-6 animate-spin text-primary" />
					) : (
						<span className="px-4 text-center text-xs text-textMuted">Falha ao carregar imagem.</span>
					)}
				</div>
			)}
			{href ? (
				<a
					href={href}
					target="_blank"
					rel="noreferrer"
					aria-label={linkLabel}
					className="absolute inset-0 z-[5] block focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
				>
					{img}
				</a>
			) : (
				img
			)}
		</div>
	);
}
