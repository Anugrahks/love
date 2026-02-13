import { useState, useRef } from 'react';
import { Settings, Upload, Music, Save, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCustomizationStore } from '@/state/customizationStore';
import CanisterSyncControls from './CanisterSyncControls';

export default function CustomizePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const musicInputRef = useRef<HTMLInputElement>(null);

  const {
    herName,
    yourName,
    anniversaryDate,
    flipCardMessages,
    setHerName,
    setYourName,
    setAnniversaryDate,
    setFlipCardMessage,
    setBackgroundMusic,
    reset,
  } = useCustomizationStore();

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackgroundMusic(url);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all customizations to defaults?')) {
      reset();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="fixed top-4 left-4 z-50 glass-card hover:glow-soft transition-all duration-300"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full sm:max-w-md glass-card-strong border-r-primary/30">
        <SheetHeader>
          <SheetTitle className="text-2xl text-gradient-romantic">
            Customize Your Love Story
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
          <div className="space-y-6 pr-4">
            {/* Names */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Personal Details</h3>

              <div>
                <Label htmlFor="her-name">Her Name</Label>
                <Input
                  id="her-name"
                  value={herName}
                  onChange={(e) => setHerName(e.target.value)}
                  placeholder="Beautiful"
                />
              </div>

              <div>
                <Label htmlFor="your-name">Your Name</Label>
                <Input
                  id="your-name"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="Your Favorite Person"
                />
              </div>

              <div>
                <Label htmlFor="anniversary">Anniversary Date</Label>
                <Input
                  id="anniversary"
                  type="date"
                  value={anniversaryDate}
                  onChange={(e) => setAnniversaryDate(e.target.value)}
                />
              </div>
            </div>

            <Separator />

            {/* Background Music */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Background Music</h3>

              <input
                ref={musicInputRef}
                type="file"
                accept="audio/*"
                onChange={handleMusicUpload}
                className="hidden"
              />

              <Button
                onClick={() => musicInputRef.current?.click()}
                variant="outline"
                className="w-full"
              >
                <Music className="w-4 h-4 mr-2" />
                Upload Custom Music
              </Button>
            </div>

            <Separator />

            {/* Flip Card Messages */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">12 Reasons Messages</h3>

              {flipCardMessages && flipCardMessages.slice(0, 11).map((entry, index) => (
                <div key={index}>
                  <Label htmlFor={`message-${index}`}>Reason {index + 1}</Label>
                  <Textarea
                    id={`message-${index}`}
                    value={entry.message}
                    onChange={(e) => setFlipCardMessage(index, e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                </div>
              ))}
            </div>

            <Separator />

            {/* Canister Sync */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Save to Cloud</h3>
              <CanisterSyncControls />
            </div>

            <Separator />

            {/* Reset */}
            <div className="space-y-4">
              <Button
                onClick={handleReset}
                variant="destructive"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
