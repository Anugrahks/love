import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    // Play heartbeat sound
    const heartbeat = new Audio('/assets/audio/heartbeat-soft.mp3');
    heartbeat.volume = 0.5;
    heartbeat.play().catch(() => {
      // Silently fail if audio doesn't play
    });

    setIsTransitioning(true);
    setTimeout(() => {
      onStart();
    }, 1200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
    >
      <div className="text-center px-6 max-w-2xl fade-in-slow">
        <div className="mb-8 inline-block">
          <Heart className="w-20 h-20 text-primary animate-pulse" fill="currentColor" />
        </div>

        <h1 className="text-4xl md:text-6xl font-script text-rose-500 drop-shadow-lg animate-fade-in-up delay-200">
          Kukku…
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-foreground/80">
          I made something just for you 💌
        </p>

        <Button
          onClick={handleStart}
          size="lg"
          className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 rounded-full glow-soft glow-pulse hover:scale-105 transition-transform duration-300"
        >
          Tap to feel loved
        </Button>
      </div>
    </div>
  );
}
