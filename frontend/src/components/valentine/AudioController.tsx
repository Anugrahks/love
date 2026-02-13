import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCustomizationStore } from '@/state/customizationStore';

interface AudioControllerProps {
  shouldStart: boolean;
}

export default function AudioController({ shouldStart }: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const backgroundMusicUrl = useCustomizationStore((state) => state.backgroundMusicUrl);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(backgroundMusicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && audioRef.current.src !== backgroundMusicUrl) {
      const wasPlaying = !audioRef.current.paused;
      const currentTime = audioRef.current.currentTime;
      audioRef.current.src = backgroundMusicUrl;
      if (wasPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [backgroundMusicUrl]);

  useEffect(() => {
    if (shouldStart && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Silently fail if autoplay is blocked
      });
    }
  }, [shouldStart, isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3;
        if (!isPlaying) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <Button
      onClick={toggleMute}
      size="icon"
      variant="ghost"
      className="fixed top-4 right-4 z-50 glass-card hover:glow-soft transition-all duration-300"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </Button>
  );
}
