import { useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

export default function Snippets({ children }: { children: ComponentChildren }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative group perspective-1000 h-full cursor-pointer touch-manipulation"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative transition-all duration-700 [transform-style:preserve-3d] h-full ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
