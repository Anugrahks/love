import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDefaultCustomization, type CustomizationState } from './customizationDefaults';

interface CustomizationStore extends CustomizationState {
  setHerName: (name: string) => void;
  setYourName: (name: string) => void;
  setAnniversaryDate: (date: string) => void;
  setTimelineEntry: (index: number, note: string, photo?: string) => void;
  setFlipCardMessage: (index: number, message: string) => void;
  setBackgroundMusic: (url: string) => void;
  reset: () => void;
  exportConfig: () => string;
  importConfig: (config: string) => void;
}

export const useCustomizationStore = create<CustomizationStore>()(
  persist(
    (set, get) => ({
      ...getDefaultCustomization(),

      setHerName: (name) => set({ herName: name }),
      setYourName: (name) => set({ yourName: name }),
      setAnniversaryDate: (date) => set({ anniversaryDate: date }),

      setTimelineEntry: (index, note, photo) => set((state) => {
        const newTimeline = [...state.timelineEntries];
        newTimeline[index] = {
          ...newTimeline[index],
          note,
          photo: photo || newTimeline[index].photo,
        };
        return { timelineEntries: newTimeline };
      }),

      setFlipCardMessage: (index, message) => set((state) => {
        const newMessages = [...state.flipCardMessages];
        newMessages[index] = { ...newMessages[index], message };
        return { flipCardMessages: newMessages };
      }),

      setBackgroundMusic: (url) => set({ backgroundMusicUrl: url }),

      reset: () => set(getDefaultCustomization()),

      exportConfig: () => {
        const state = get();
        return JSON.stringify({
          herName: state.herName,
          yourName: state.yourName,
          anniversaryDate: state.anniversaryDate,
          timelineEntries: state.timelineEntries.map(e => ({ title: e.title, note: e.note })),
          flipCardMessages: state.flipCardMessages.map(m => m.message),
        });
      },

      importConfig: (config) => {
        try {
          const parsed = JSON.parse(config);
          set((state) => ({
            herName: parsed.herName || state.herName,
            yourName: parsed.yourName || state.yourName,
            anniversaryDate: parsed.anniversaryDate || state.anniversaryDate,
            timelineEntries: state.timelineEntries.map((entry, i) => ({
              ...entry,
              note: parsed.timelineEntries?.[i]?.note || entry.note,
            })),
            flipCardMessages: parsed.flipCardMessages
              ? state.flipCardMessages.map((msg, i) => ({
                ...msg,
                message: parsed.flipCardMessages[i] || msg.message
              }))
              : state.flipCardMessages,
          }));
        } catch (error) {
          console.error('Failed to import config:', error);
        }
      },
    }),
    {
      name: 'valentine-customization-v2',
      partialize: (state) => ({
        herName: state.herName,
        yourName: state.yourName,
        anniversaryDate: state.anniversaryDate,
        timelineEntries: state.timelineEntries,
        flipCardMessages: state.flipCardMessages,
        backgroundMusicUrl: state.backgroundMusicUrl,
      }),
    }
  )
);
