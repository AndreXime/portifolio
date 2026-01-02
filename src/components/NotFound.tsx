import { useEffect, useRef } from "preact/hooks";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const stars: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
      direction: number;
    }[] = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.2 + 0.1,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const drawStars = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      stars.forEach((star) => {
        star.alpha += 0.02 * star.direction;
        if (star.alpha >= 1 || star.alpha <= 0) {
          star.direction *= -1;
        }
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.x = Math.random() * canvas.width;
          star.y = 0;
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    let animationFrameId: number;
    const animate = () => {
      drawStars();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-900 text-white overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      <style>
        {`
        @keyframes pulse-glow {
          0%, 100% {
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0077ff, 0 0 20px #0077ff;
            filter: drop-shadow(0 0 5px #0077ff);
          }
          50% {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0077ff, 0 0 40px #0077ff;
            filter: drop-shadow(0 0 10px #0077ff);
          }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .astronaut-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .floating-astronaut {
          animation: float 6s ease-in-out infinite;
        }
      `}
      </style>

      <div className="relative z-10 text-center p-8">
        <div className="relative inline-block mb-8 floating-astronaut">
          <svg className="w-48 h-48 astronaut-glow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFFFFF">
              <circle cx="100" cy="80" r="40" fill="#E0E0E0" />
              <path d="M 60 80 A 40 40 0 0 1 140 80 A 50 60 0 0 1 60 80 Z" fill="#4299e1" />
              <circle cx="100" cy="80" r="35" fill="#1a202c" />
              <circle cx="115" cy="75" r="5" fill="rgba(255,255,255,0.4)" />

              <path d="M 80 115 C 70 125, 70 160, 100 160 C 130 160, 130 125, 120 115 L 80 115 Z" fill="#E0E0E0" />
              <rect x="90" y="125" width="20" height="20" rx="5" fill="#4A5568" />

              <path d="M 70 120 C 50 110, 40 130, 55 145 L 75 130 Z" fill="#E0E0E0" />
              <path d="M 130 120 C 150 110, 160 130, 145 145 L 125 130 Z" fill="#E0E0E0" />
            </g>
          </svg>
        </div>

        <h1 className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">Pagina não foi encontrada</h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg mx-auto">
          Parece que essa pagina que você busca não existe, cheque a URL ou clique no botão a baixo para voltar a tela
          inicial
        </p>

        <a
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
        >
          IR A TELA INICIAL
        </a>
      </div>
    </div>
  );
}
