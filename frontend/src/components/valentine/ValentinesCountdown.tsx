import { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

export default function ValentinesCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let valentinesDay = new Date(currentYear, 1, 14); // February 14

      // If Valentine's Day has passed this year, target next year
      if (now > valentinesDay) {
        valentinesDay = new Date(currentYear + 1, 1, 14);
      }

      const difference = valentinesDay.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard className="p-6 md:p-8 text-center">
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-gradient-romantic">
        Countdown to Next Valentine's Day
      </h3>
      
      <div className="grid grid-cols-4 gap-4">
        <div>
          <div className="text-3xl md:text-4xl font-bold text-primary">{timeLeft.days}</div>
          <div className="text-sm text-muted-foreground">Days</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-bold text-primary">{timeLeft.hours}</div>
          <div className="text-sm text-muted-foreground">Hours</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-bold text-primary">{timeLeft.minutes}</div>
          <div className="text-sm text-muted-foreground">Minutes</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-bold text-primary">{timeLeft.seconds}</div>
          <div className="text-sm text-muted-foreground">Seconds</div>
        </div>
      </div>
    </GlassCard>
  );
}
