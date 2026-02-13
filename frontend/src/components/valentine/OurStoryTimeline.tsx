import { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCustomizationStore } from '@/state/customizationStore';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import GlassCard from './GlassCard';

export default function OurStoryTimeline() {
  const timelineEntries = useCustomizationStore((state) => state.timelineEntries);
  const setTimelineEntry = useCustomizationStore((state) => state.setTimelineEntry);

  return (
    <section className="relative py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16 fade-in">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-romantic">
          Our Story
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          Every moment with you is a chapter I never want to end
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30 hidden md:block" />

        <div className="space-y-12 md:space-y-20">
          {timelineEntries.map((entry, index) => (
            <TimelineEntry
              key={index}
              entry={entry}
              index={index}
              isEven={index % 2 === 0}
              onNoteChange={(note) => setTimelineEntry(index, note, entry.photo)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TimelineEntryProps {
  entry: { title: string; note: string; photo?: string };
  index: number;
  isEven: boolean;
  onNoteChange: (note: string) => void;
}

function TimelineEntry({ entry, index, isEven, onNoteChange }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnScroll(ref);

  return (
    <div
      ref={ref}
      className={`relative md:grid md:grid-cols-2 md:gap-8 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-x-1/2 hidden md:block glow-soft" />

      <div className={`${isEven ? 'md:col-start-1' : 'md:col-start-2'}`}>
        <GlassCard className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient-romantic">
            {entry.title}
          </h3>

          {entry.photo && (
            <div className="mb-4 rounded-2xl overflow-hidden">
              <img
                src={entry.photo}
                alt={entry.title}
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
          )}


          <Textarea
            value={entry.note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Write your love note here..."
            className="mb-4 min-h-[100px] bg-background/50 border-border/50 resize-none"
          />
        </GlassCard>
      </div>
    </div>
  );
}
