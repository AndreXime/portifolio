import type { Book } from "@/content/types";
import { useState } from "preact/hooks";
import SectionHeader from "../components/ui/SectionHeader";

import { Bookmark, CheckCircle2 } from "lucide-preact";

const STYLE_MAP: Record<Book["state"], string> = {
	Lido: "bg-successBg text-success border-successBorder",
	"Lendo atualmente": "bg-infoBg text-info border-infoBorder",
	"Na lista de desejos": "bg-surfaceHighlight text-textMuted border-border",
};

export default function BooksSection({ books }: { books: Book[] }) {
	const [expand, setExpand] = useState(false);
	const mainBooks = books.slice(0, 6);
	const secondaryBooks = books.slice(6);

	const booksView = expand ? mainBooks : mainBooks.slice(0, 3);

	return (
		<section id="biblioteca" className="py-20 bg-section5 border-y border-border">
			<div data-reveal-time={0} class="reveal reveal-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeader
						bagde="Conhecimento"
						title="Minha Biblioteca Técnica"
						subtitle="Livros que moldaram minha forma de pensar como engenheiro de software."
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{booksView.slice(0, 6).map((book, index) => {
							let responsiveClass = "";

							if (!expand) {
								// Se for o 3º item (index 2), só mostra se tiver 3 colunas (lg)
								if (index === 2) responsiveClass = "hidden lg:block";
							}

							return (
								<div key={book.title} className={responsiveClass}>
									<BookCard {...book} key={book.title} />{" "}
								</div>
							);
						})}

						{expand && secondaryBooks.length > 0 && (
							<div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{secondaryBooks.map((book) => (
									<CompactBookItem key={book.title} {...book} />
								))}
							</div>
						)}
						<div className="flex justify-center items-center col-span-full">
							<button
								type="button"
								onClick={() => setExpand(!expand)}
								aria-label={!expand ? "Expandir para ver todos os livros da biblioteca" : "Recolher e mostrar menos livros"}
								aria-expanded={expand}
								className={`px-4 py-2 rounded-lg font-medium transition-all bg-primary text-white shadow-lg shadow-primary/30`}
							>
								{!expand ? "Ver biblioteca completa" : "Esconder livros"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function BookCard(book: Book) {
	return (
		<div className="bg-surface rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 flex flex-col h-full transition-all duration-300 hover:shadow-lg group">
			<div className="relative h-64 w-full bg-surfaceHighlight overflow-hidden flex items-center justify-center border-b border-borderLight/60">
				<div className="absolute inset-0 bg-gradient-to-t from-textMain/20 to-transparent z-10" />
				<img
					src={book.imageUrl}
					alt={`Capa do livro ${book.title} por ${book.author}`}
					loading="lazy"
					decoding="async"
					className="w-auto h-4/5 object-contain transition-transform duration-500 group-hover:scale-105 z-20 shadow-2xl"
					width={180}
					height={240}
				/>
			</div>

			<div className="p-6 flex flex-col flex-grow">
				<div className="flex justify-start items-start mb-3 gap-3">
					<span
						className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${
							STYLE_MAP[book.state]
						}`}
					>
						{book.state}
					</span>
					<span
						className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${STYLE_MAP["Lendo atualmente"]}`}
					>
						{book.tag}
					</span>
				</div>

				<h3 className="text-xl font-bold text-textSecondary mb-1 group-hover:text-primary transition-colors">
					{book.title}
				</h3>
				<p className="text-sm text-textSubtle mb-4">por {book.author}</p>

				<div className="relative">
					<p className="text-textMuted text-sm leading-relaxed italic relative z-10">
						{book.review || "Sem comentário disponível no momento."}
					</p>
				</div>
			</div>
		</div>
	);
}

function CompactBookItem(book: Book) {
	return (
		<div className="flex items-center p-3 bg-surface rounded-lg border border-border/50 hover:border-border transition-colors">
			<div className="h-10 w-8 rounded overflow-hidden relative flex-shrink-0 mr-3">
				<img
					src={book.imageUrl}
					alt={`Capa do livro ${book.title}`}
					width={80}
					height={80}
					loading="lazy"
					decoding="async"
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="flex-grow min-w-0">
				<h3 className="text-sm font-medium text-textSecondary truncate" title={book.title}>
					{book.title}
				</h3>
				<p className="text-xs text-textMuted truncate">{book.author}</p>
			</div>

			<div className="flex-shrink-0 ml-2">
				<output
					className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
						book.state === "Lido"
							? "bg-successBg text-success border-successBorder"
							: "bg-surfaceAlt text-textMuted border-border"
					}`}
					aria-label={`Status do livro: ${book.state}`}
				>
					{book.state === "Lido" ? (
						<>
							<CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
							Lido
						</>
					) : (
						<>
							<Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
							Pendente
						</>
					)}
				</output>
			</div>
		</div>
	);
}
