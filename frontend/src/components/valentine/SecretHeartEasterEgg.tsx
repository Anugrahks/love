import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SecretCodeUnlock from './SecretCodeUnlock';

export default function SecretHeartEasterEgg() {
  const [tapCount, setTapCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= 5) {
      setShowSecret(true);
      setTapCount(0);
    }
  };

  return (
    <>
      <button
        onClick={handleTap}
        className="fixed bottom-4 left-4 z-50 p-3 rounded-full glass-card hover:glow-soft transition-all duration-300 group"
        aria-label="Secret heart"
      >
        <Heart
          className="w-6 h-6 text-primary group-hover:scale-110 transition-transform"
          fill="currentColor"
        />
      </button>

      <Dialog open={showSecret} onOpenChange={setShowSecret}>
        <DialogContent className="glass-card-strong border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl text-gradient-romantic text-center">
              Secret Message Unlocked 💕
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <p className="text-xl md:text-2xl text-center font-medium">
              You're the best thing that ever happened to me.
            </p>
            
            <div className="pt-6 border-t border-border/50">
              <SecretCodeUnlock />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
