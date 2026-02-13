import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from './GlassCard';
import ValentinesCountdown from './ValentinesCountdown';
import FloatingLoveFooter from './FloatingLoveFooter';
import FireworksAnimation from './FireworksAnimation';

export default function FinalSurpriseMoment() {
  const [showProposal, setShowProposal] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleAnswer = () => {
    setShowProposal(false);
    setShowFireworks(true);
    
    setTimeout(() => {
      setShowFireworks(false);
      setShowFinalMessage(true);
    }, 3000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
      {/* Dimmed background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {showFireworks && <FireworksAnimation />}

      <div className="relative z-10 max-w-3xl w-full">
        {showProposal && (
          <div className="fade-in-slow">
            <GlassCard className="p-8 md:p-12 text-center glow-soft">
              <Heart className="w-20 h-20 mx-auto mb-8 text-primary animate-pulse" fill="currentColor" />
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 text-gradient-romantic">
                Will you be my forever Valentine?
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleAnswer}
                  size="lg"
                  className="text-xl px-12 py-8 rounded-full glow-soft hover:scale-105 transition-transform"
                >
                  Yes 🥺
                </Button>
                <Button
                  onClick={handleAnswer}
                  size="lg"
                  variant="secondary"
                  className="text-xl px-12 py-8 rounded-full glow-soft hover:scale-105 transition-transform"
                >
                  Obviously Yes 😌
                </Button>
              </div>
            </GlassCard>
          </div>
        )}

        {showFinalMessage && (
          <div className="fade-in-slow space-y-12">
            <GlassCard className="p-8 md:p-12 text-center glow-gold">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gradient-gold leading-relaxed">
                I loved you yesterday.
                <br />
                I love you today.
                <br />
                I'll love you more tomorrow.
              </h2>
              
              <Heart className="w-16 h-16 mx-auto text-primary" fill="currentColor" />
            </GlassCard>

            <ValentinesCountdown />
            <FloatingLoveFooter />
          </div>
        )}
      </div>
    </section>
  );
}
