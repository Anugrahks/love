import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useCustomizationStore } from '@/state/customizationStore';

export default function SecretCodeUnlock() {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const anniversaryDate = useCustomizationStore((state) => state.anniversaryDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format: YYYY-MM-DD or MMDDYYYY or MMDD
    const normalizedCode = code.replace(/[-/\s]/g, '');
    const normalizedDate = anniversaryDate.replace(/[-/\s]/g, '');

    if (
      normalizedCode === normalizedDate ||
      normalizedCode === normalizedDate.slice(4) ||
      normalizedCode === normalizedDate.slice(5) ||
      normalizedCode === normalizedDate.slice(4) + normalizedDate.slice(0, 4)
    ) {
      setIsUnlocked(true);
    } else {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }
  };

  if (isUnlocked) {
    return (
      <div className="text-center space-y-4 fade-in">
        <div className="text-4xl">💍</div>
        <p className="text-xl md:text-2xl font-bold text-gradient-gold">
          You're not just my Valentine.
          <br />
          You're my future.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">One More Secret...</h3>
        <p className="text-sm text-muted-foreground">
          Enter our special date to unlock the final message
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="secret-code">Secret Code</Label>
          <Input
            id="secret-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="MM-DD-YYYY"
            className="text-center"
          />
        </div>

        {showHint && (
          <p className="text-sm text-destructive text-center fade-in">
            Hmm, that's not quite right. Try our anniversary date 💕
          </p>
        )}

        <Button type="submit" className="w-full">
          Unlock
        </Button>
      </form>
    </div>
  );
}
