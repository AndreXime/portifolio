"use client";
import Image from "next/image";
import { Reveal } from "../components/Reveal";
import { books, type book } from "@/components/books";

const STYLE_MAP: Record<book["state"], string> = {
	Lido: "bg-emerald-100 text-emerald-700 border-emerald-200",
	"Lendo atualmente": "bg-blue-100 text-blue-700 border-blue-200",
	"Na fila": "bg-slate-100 text-slate-600 border-slate-200",
	Referência: "bg-purple-100 text-purple-700 border-purple-200",
};

export function Books() {
	return (
		<section
			id="biblioteca"
			className="py-20 bg-slate-50 border-y border-slate-200"
		>
			<Reveal>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="inline-block px-3 py-1 mb-4 text-xs font-mono text-primary bg-white rounded-full border border-primary/20 shadow-sm">
							Conhecimento
						</div>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
							Minha Biblioteca Técnica
						</h2>
						<p className="text-slate-600 max-w-2xl mx-auto">
							Livros que moldaram minha forma de pensar software, organizados
							por status de leitura e impacto.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{books.map((book) => (
							<BookCard {...book} key={book.title} />
						))}
					</div>
				</div>
			</Reveal>
		</section>
	);
}

function BookCard(book: book) {
	return (
		<div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary/40 flex flex-col h-full transition-all duration-300 hover:shadow-lg group">
			{/* Container da Imagem */}
			<div className="relative h-64 w-full bg-slate-100 overflow-hidden flex items-center justify-center border-b border-slate-100">
				<div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent z-10" />
				<Image
					src={`/livros/${book.imageurl}`}
					alt={book.title}
					className="w-auto h-4/5 object-contain transition-transform duration-500 group-hover:scale-105 z-20 shadow-2xl"
					width={180}
					height={240}
				/>
			</div>

			{/* Conteúdo */}
			<div className="p-6 flex flex-col flex-grow">
				<div className="flex justify-between items-start mb-3">
					<span
						className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${STYLE_MAP[book.state]}`}
					>
						{book.state}
					</span>
				</div>

				<h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
					{book.title}
				</h3>
				<p className="text-sm text-slate-400 mb-4">por {book.author}</p>

				<div className="relative">
					<p className="text-slate-600 text-sm leading-relaxed italic relative z-10">
						{book.review || "Sem comentário disponível no momento."}
					</p>
				</div>
			</div>
		</div>
	);
}
