import { useEffect, useRef, useState, type ReactNode } from "preact/compat";

interface RevealProps {
  children: ReactNode;
  delay?: number; // delay em ms (ex: 200)
  className?: string;
}

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animar apenas uma vez
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Classes baseadas no CSS original
  const transitionClasses = `transform transition-all duration-800 ease-[cubic-bezier(0.5,0,0,1)]`;
  const activeClasses = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]";

  return (
    <div
      ref={ref}
      className={`${transitionClasses} ${activeClasses} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
