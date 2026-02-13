import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import LandingScreen from './components/valentine/LandingScreen';
import AmbientBackground from './components/valentine/AmbientBackground';
import AudioController from './components/valentine/AudioController';
import OurStoryTimeline from './components/valentine/OurStoryTimeline';
import ReasonsFlipCards from './components/valentine/ReasonsFlipCards';
import LoveLetter from './components/valentine/LoveLetter';
import LoveMeter from './components/valentine/LoveMeter';
import FinalSurpriseMoment from './components/valentine/FinalSurpriseMoment';
import SecretHeartEasterEgg from './components/valentine/SecretHeartEasterEgg';
import CustomizePanel from './components/valentine/CustomizePanel';

const queryClient = new QueryClient();

function AppContent() {
  const [hasStarted, setHasStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
    setAudioStarted(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AmbientBackground />
      <AudioController shouldStart={audioStarted} />
      <SecretHeartEasterEgg />
      <CustomizePanel />

      {!hasStarted ? (
        <LandingScreen onStart={handleStart} />
      ) : (
        <main className="relative z-10">
          <OurStoryTimeline />
          <ReasonsFlipCards />
          <LoveLetter />
          <LoveMeter />
          <FinalSurpriseMoment />
        </main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
