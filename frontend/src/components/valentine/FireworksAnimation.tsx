import { useEffect, useRef } from 'react';

export default function FireworksAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }

    const fireworks: Particle[][] = [];
    const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#FF6B9D', '#FFD700'];

    const createFirework = (x: number, y: number) => {
      const particles: Particle[] = [];
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 3 + 2;
        
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          maxLife: Math.random() * 60 + 60,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 2,
        });
      }
      
      fireworks.push(particles);
    };

    // Create initial fireworks
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createFirework(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.5 + canvas.height * 0.1
        );
      }, i * 300);
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireworks.forEach((particles, fireworkIndex) => {
        particles.forEach((particle, particleIndex) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.05; // Gravity
          particle.life++;

          const alpha = 1 - particle.life / particle.maxLife;
          
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (particle.life >= particle.maxLife) {
            particles.splice(particleIndex, 1);
          }
        });

        if (particles.length === 0) {
          fireworks.splice(fireworkIndex, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
    />
  );
}
