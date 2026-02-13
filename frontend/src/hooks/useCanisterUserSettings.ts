import { useState } from 'react';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { useCustomizationStore } from '@/state/customizationStore';
import type { UserSettings } from '@/backend';

export function useCanisterUserSettings() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    herName,
    yourName,
    anniversaryDate,
    flipCardMessages,
    timelineEntries,
    setHerName,
    setYourName,
    setAnniversaryDate,
    setFlipCardMessage,
    setTimelineEntry,
  } = useCustomizationStore();

  const saveSettings = async () => {
    if (!actor || !identity) {
      throw new Error('Not authenticated');
    }

    setIsSaving(true);
    try {
      // Convert anniversary date to nanoseconds timestamp
      const anniversaryTimestamp = BigInt(new Date(anniversaryDate).getTime() * 1_000_000);
      
      // Prepare custom messages (text only, no images)
      const customMessages = [
        `herName:${herName}`,
        `yourName:${yourName}`,
        ...flipCardMessages.map((msg, i) => `flipCard${i}:${msg}`),
        ...timelineEntries.map((entry, i) => `timeline${i}:${entry.note}`),
      ];

      const settings: UserSettings = {
        anniversaryDate: anniversaryTimestamp,
        customMessages,
        names: [herName, yourName],
      };

      await actor.saveUserSettings(settings);
    } finally {
      setIsSaving(false);
    }
  };

  const loadSettings = async () => {
    if (!actor || !identity) {
      throw new Error('Not authenticated');
    }

    setIsLoading(true);
    try {
      const settings = await actor.getUserSettings();
      
      if (settings) {
        // Convert timestamp back to date string
        const date = new Date(Number(settings.anniversaryDate) / 1_000_000);
        const dateString = date.toISOString().split('T')[0];
        setAnniversaryDate(dateString);

        // Parse custom messages
        settings.customMessages.forEach((msg) => {
          const [key, ...valueParts] = msg.split(':');
          const value = valueParts.join(':');
          
          if (key === 'herName') {
            setHerName(value);
          } else if (key === 'yourName') {
            setYourName(value);
          } else if (key.startsWith('flipCard')) {
            const index = parseInt(key.replace('flipCard', ''));
            setFlipCardMessage(index, value);
          } else if (key.startsWith('timeline')) {
            const index = parseInt(key.replace('timeline', ''));
            setTimelineEntry(index, value);
          }
        });

        // Set names from names array as fallback
        if (settings.names.length >= 2) {
          if (!herName || herName === 'Beautiful') setHerName(settings.names[0]);
          if (!yourName || yourName === 'Your Favorite Person') setYourName(settings.names[1]);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveSettings,
    loadSettings,
    isSaving,
    isLoading,
  };
}
