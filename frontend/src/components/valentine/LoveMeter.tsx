import { useState, useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import GlassCard from './GlassCard';

export default function LoveMeter() {
  const [progress, setProgress] = useState(0);
  const [isBroken, setIsBroken] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnScroll(ref);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      
      // Animate progress from 0 to 100
      const duration = 3000;
      const steps = 100;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setProgress(currentStep);
        
        if (currentStep >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsBroken(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }, 500);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section ref={ref} className="relative py-20 px-4 md:px-8 max-w-4xl mx-auto">
      {showConfetti && <ConfettiAnimation />}
      
      <div className="text-center mb-12 fade-in">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-romantic">
          The Love Meter
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          Measuring how much I love you...
        </p>
      </div>

      <GlassCard className="p-8 md:p-12">
        {!isBroken ? (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-gradient-romantic">
                {progress}%
              </span>
            </div>
            <Progress value={progress} className="h-8 md:h-12" />
          </div>
        ) : (
          <div className="text-center space-y-6 animate-pulse">
            <div className="text-4xl md:text-6xl font-bold text-destructive">
              ⚠️ SYSTEM ERROR ⚠️
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gradient-romantic">
              Love too powerful to measure 💞
            </p>
            <div className="text-lg md:text-xl text-muted-foreground">
              The meter couldn't handle how much I love you
            </div>
          </div>
        )}
      </GlassCard>
    </section>
  );
}

function ConfettiAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Confetti {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      isHeart: boolean;
    }

    const confetti: Confetti[] = [];
    const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#FF6B9D'];

    for (let i = 0; i < 100; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 10 + 5,
        speedY: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHeart: Math.random() > 0.5,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((piece) => {
        piece.y += piece.speedY;
        piece.x += piece.speedX;
        piece.rotation += piece.rotationSpeed;

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation);
        ctx.fillStyle = piece.color;

        if (piece.isHeart) {
          // Draw heart
          ctx.beginPath();
          ctx.moveTo(0, piece.size * 0.3);
          ctx.bezierCurveTo(-piece.size * 0.5, -piece.size * 0.2, -piece.size, -piece.size * 0.2, -piece.size, piece.size * 0.2);
          ctx.bezierCurveTo(-piece.size, piece.size * 0.5, -piece.size * 0.5, piece.size * 0.7, 0, piece.size);
          ctx.bezierCurveTo(piece.size * 0.5, piece.size * 0.7, piece.size, piece.size * 0.5, piece.size, piece.size * 0.2);
          ctx.bezierCurveTo(piece.size, -piece.size * 0.2, piece.size * 0.5, -piece.size * 0.2, 0, piece.size * 0.3);
          ctx.fill();
        } else {
          // Draw rectangle
          ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
}
