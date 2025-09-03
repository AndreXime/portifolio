import { ProjectType } from '@/content/Projects';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProjectModalProps {
    projeto: ProjectType;
    setModal: (projeto: ProjectType | undefined) => void;
}

export default function ProjectModal({ projeto, setModal }: ProjectModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = (e: React.MouseEvent) => {
        e.stopPropagation(); // Impede que o clique feche o modal
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? projeto.images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation(); // Impede que o clique feche o modal
        const isLastImage = currentIndex === projeto.images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const closeModal = () => {
        setModal(undefined);
    };

    // Efeito para fechar com a tecla 'Escape' e travar o scroll do body
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden'; // Trava o scroll da página

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = ''; // Restaura o scroll
        };
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={closeModal}
        >
            <div
                // Impede a propagação do onclick do div de cima
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            >
                {/* Cabeçalho */}
                <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">{projeto.title}</h2>
                    <button onClick={closeModal} className="text-gray-400 hover:text-white">
                        <X className="w-7 h-7" />
                    </button>
                </header>

                <div className="p-4 pt-2 overflow-y-auto modal-body">
                    <div className="relative w-full ">
                        {/* Imagem Principal */}
                        <div className="w-full h-auto aspect-video rounded-lg flex items-center justify-center">
                            <img
                                src={projeto.images[currentIndex]}
                                alt={`Imagem ${currentIndex + 1} do projeto ${projeto.title}`}
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />
                        </div>

                        {projeto.images.length > 1 && (
                            <>
                                {/* Seta Esquerda */}
                                <button
                                    onClick={goToPrevious}
                                    className="absolute top-1/2 left-2 md:-left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-opacity duration-300 opacity-100"
                                >
                                    <ArrowLeft />
                                </button>

                                {/* Seta Direita */}
                                <button
                                    onClick={goToNext}
                                    className="absolute top-1/2 right-2 md:-right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-opacity duration-300 opacity-100"
                                >
                                    <ArrowRight />
                                </button>

                                {/* Indicador de Posição */}
                                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                    {currentIndex + 1} / {projeto.images.length}
                                </div>
                            </>
                        )}
                    </div>
                    <div
                        className="text-slate-300 prose prose-invert text-left mx-auto mt-2"
                        dangerouslySetInnerHTML={{
                            __html: projeto.description,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
