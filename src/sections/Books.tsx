import { Reveal } from "../components/Reveal";
import type { Book } from "@/content/books";
import { useState } from "preact/hooks";

import { Bookmark, CheckCircle2 } from "lucide-preact";

const STYLE_MAP: Record<Book["state"], string> = {
  Lido: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Lendo atualmente": "bg-blue-100 text-blue-700 border-blue-200",
  "Na lista de desejos": "bg-slate-100 text-slate-600 border-slate-200",
};

export default function BooksSection({ books }: { books: Book[] }) {
  const [expand, setExpand] = useState(false);
  const mainBooks = books.slice(0, 6);
  const secondaryBooks = books.slice(6);

  const booksView = expand ? mainBooks : mainBooks.slice(0, 3);

  return (
    <section id="biblioteca" className="py-20 bg-slate-50 border-y border-slate-200">
      <Reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-mono text-primary bg-white rounded-full border border-primary/20 shadow-sm">
              Conhecimento
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Minha Biblioteca Técnica</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Livros que moldaram minha forma de pensar como engenheiro de software.
            </p>
          </div>

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
                className={`px-4 py-2 rounded-lg font-medium transition-all bg-primary text-white shadow-lg shadow-blue-500/30`}
              >
                {!expand ? "Ver biblioteca completa" : "Esconder livros"}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function BookCard(book: Book) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary/40 flex flex-col h-full transition-all duration-300 hover:shadow-lg group">
      {/* Container da Imagem */}
      <div className="relative h-64 w-full bg-slate-100 overflow-hidden flex items-center justify-center border-b border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent z-10" />
        <img
          src={book.imageUrl}
          alt={book.title}
          loading="lazy"
          decoding="async"
          className="w-auto h-4/5 object-contain transition-transform duration-500 group-hover:scale-105 z-20 shadow-2xl"
          width={180}
          height={240}
        />
      </div>

      {/* Conteúdo */}
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

function CompactBookItem(book: Book) {
  return (
    <div className="flex items-center p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-300 transition-colors">
      {/* Opcional: Miniatura muito pequena ou apenas ícone */}
      <div className="h-10 w-8 rounded overflow-hidden relative flex-shrink-0 mr-3">
        <img
          src={book.imageUrl}
          alt={book.title}
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-grow min-w-0">
        <h3 className="text-sm font-medium text-slate-800 truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-xs text-slate-500 truncate">{book.author}</p>
      </div>

      {/* Status simplificado */}
      <div className="flex-shrink-0 ml-2">
        {book.state === "Lido" ? (
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        ) : (
          <Bookmark className="w-6 h-6 text-slate-300" />
        )}
      </div>
    </div>
  );
}
