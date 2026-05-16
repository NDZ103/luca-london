import { useEffect, useRef } from "react";

export default function Particles({ count = 60, color = "#C8A96E" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.6 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
      isSparkle: Math.random() > 0.75,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.phase += p.speed;
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const pulse = Math.sin(p.phase) * 0.3 + 0.7;
        ctx.globalAlpha = p.alpha * pulse;

        if (p.isSparkle) {
          // Draw 4-point star sparkle
          const size = p.r * 3;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.phase * 0.5);
          ctx.fillStyle = color;
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
            ctx.lineTo(Math.cos(angle + Math.PI / 4) * size * 0.3, Math.sin(angle + Math.PI / 4) * size * 0.3);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
}
