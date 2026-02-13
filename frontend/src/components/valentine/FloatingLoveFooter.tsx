import { Heart } from 'lucide-react';

export default function FloatingLoveFooter() {
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname || 'valentine-love-story')
    : 'valentine-love-story';

  return (
    <div className="text-center py-8 space-y-4">
      <p className="text-lg md:text-xl text-foreground/80 flex items-center justify-center gap-2">
        Made with <Heart className="w-5 h-5 text-primary animate-pulse" fill="currentColor" /> by your favorite person ❤️
      </p>
      
      <p className="text-sm text-muted-foreground">
        Built with love using{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </p>
    </div>
  );
}
