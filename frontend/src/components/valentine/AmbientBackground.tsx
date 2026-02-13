import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for floating petals and hearts
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      type: 'petal' | 'heart';
      opacity: number;
    }

    const particles: Particle[] = [];
    const particleCount = 30;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speedY: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: Math.random() > 0.5 ? 'petal' : 'heart',
        opacity: Math.random() * 0.3 + 0.2,
      });
    }

    // Draw petal
    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      
      // Petal shape
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.5, -size * 0.8, size * 0.8, -size * 0.3, size * 0.3, 0);
      ctx.bezierCurveTo(size * 0.5, size * 0.3, 0, size * 0.5, 0, 0);
      ctx.bezierCurveTo(0, size * 0.5, -size * 0.5, size * 0.3, -size * 0.3, 0);
      ctx.bezierCurveTo(-size * 0.8, -size * 0.3, -size * 0.5, -size * 0.8, 0, -size);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, 'rgba(255, 182, 193, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 105, 180, 0.4)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.restore();
    };

    // Draw heart
    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      
      ctx.beginPath();
      ctx.moveTo(0, size * 0.3);
      ctx.bezierCurveTo(-size * 0.5, -size * 0.2, -size, -size * 0.2, -size, size * 0.2);
      ctx.bezierCurveTo(-size, size * 0.5, -size * 0.5, size * 0.7, 0, size);
      ctx.bezierCurveTo(size * 0.5, size * 0.7, size, size * 0.5, size, size * 0.2);
      ctx.bezierCurveTo(size, -size * 0.2, size * 0.5, -size * 0.2, 0, size * 0.3);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, 'rgba(255, 105, 180, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 20, 147, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(255, 105, 180, 0.5)';
      ctx.fill();
      
      ctx.restore();
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += particle.rotationSpeed;

        // Wrap around screen
        if (particle.y > canvas.height + particle.size) {
          particle.y = -particle.size;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x > canvas.width + particle.size) {
          particle.x = -particle.size;
        } else if (particle.x < -particle.size) {
          particle.x = canvas.width + particle.size;
        }

        // Draw particle
        if (particle.type === 'petal') {
          drawPetal(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.opacity);
        } else {
          drawHeart(ctx, particle.x, particle.y, particle.size * 0.6, particle.opacity);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, oklch(0.98 0.02 15), oklch(0.96 0.03 25))' }}
    />
  );
}
