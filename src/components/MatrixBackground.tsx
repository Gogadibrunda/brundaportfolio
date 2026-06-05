import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Cyan, green, and electric purple glints
    const colors = ["#00E5FF", "#7B2FF7", "#00FFB2", "#070B1E"];
    const chars = "01ACTIVATENEURALBRAINX7Y9Z10TENSORMATRIXNETWORKGPT5GRADIENTWEIGHTSCLASSIFIERBINARYOPTIMIZERPYTHON19721";
    const charArray = chars.split("");

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);

    // Track vertical drops
    const drops: number[] = [];
    const speedMultiplier: number[] = [];
    const colorIndices: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // stagger starting heights
      speedMultiplier[i] = 1 + Math.random() * 2;
      colorIndices[i] = Math.floor(Math.random() * 3); // cyan, purple, or neon green
    }

    const draw = () => {
      // Subtle trail fading backdrop
      ctx.fillStyle = "rgba(5, 8, 22, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Select matching color for the column
        const colIndex = colorIndices[i];
        let color = colors[colIndex];
        
        // Randomly make head of drop look blindingly white/cyan
        if (Math.random() > 0.96) {
          color = "#FFFFFF";
        }

        ctx.fillStyle = color;
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drops
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
          speedMultiplier[i] = 1 + Math.random() * 1.5;
          colorIndices[i] = Math.floor(Math.random() * 3);
        }

        drops[i] += speedMultiplier[i] * 0.4;
      }
    };

    let frameId: number;
    const renderLoop = () => {
      draw();
      frameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      for (let i = drops.length; i < columns; i++) {
        drops[i] = Math.random() * -50;
        speedMultiplier[i] = 1 + Math.random() * 2;
        colorIndices[i] = Math.floor(Math.random() * 3);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-25 z-0"
    />
  );
}
