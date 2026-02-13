import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useCustomizationStore } from '@/state/customizationStore';
import { ReasonEntry } from '@/state/customizationDefaults';
import GlassCard from './GlassCard';

export default function ReasonsFlipCards() {
  const flipCardMessages = useCustomizationStore((state) => state.flipCardMessages);

  return (
    <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 fade-in">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-romantic">
          12 Reasons I'm Crazy About You
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          Tap each card to reveal why you're everything to me
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {flipCardMessages && flipCardMessages.map((entry, index) => (
          <FlipCard
            key={index}
            index={index + 1}
            entry={entry}
            isSpecial={index === 11}
          />
        ))}
      </div>
    </section>
  );
}

interface FlipCardProps {
  index: number;
  entry: ReasonEntry;
  isSpecial: boolean;
}

function FlipCard({ index, entry, isSpecial }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card h-64 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front">
          <GlassCard
            className={`w-full h-full flex flex-col items-center justify-center p-6 ${isSpecial ? 'glow-gold' : 'hover:glow-soft'
              } transition-all duration-300 overflow-hidden relative`}
          >
            {entry.photo ? (
              <img
                src={entry.photo}
                alt={`Reason ${index}`}
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
            ) : (
              <>
                <Heart
                  className={`w-16 h-16 mb-4 ${isSpecial ? 'text-gradient-gold' : 'text-primary'}`}
                  fill="currentColor"
                />
                <span className={`text-6xl font-bold ${isSpecial ? 'text-gradient-gold' : 'text-primary'}`}>
                  {index}
                </span>
              </>
            )}

            {/* Overlay for legibility if needed, or just let the image be the cover */}
            {entry.photo && (
              <div className="absolute inset-0 flex items-start justify-center bg-black/30 pt-4">
                <span className="text-6xl font-bold text-white drop-shadow-lg">
                  {index}
                </span>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Back */}
        <div className="flip-card-back">
          <GlassCard
            className={`w-full h-full flex items-center justify-center p-6 text-center ${isSpecial ? 'glow-gold' : ''
              }`}
          >
            <p className={`text-lg md:text-xl font-medium ${isSpecial ? 'text-gradient-gold text-2xl' : ''}`}>
              {isSpecial ? `And I'm never letting you go ❤️` : entry.message}
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
