export interface TimelineEntry {
  title: string;
  note: string;
  photo?: string;
}

export interface ReasonEntry {
  message: string;
  photo: string;
}

export interface CustomizationState {
  herName: string;
  yourName: string;
  anniversaryDate: string;
  timelineEntries: TimelineEntry[];
  flipCardMessages: ReasonEntry[];
  backgroundMusicUrl: string;
}

export function getDefaultCustomization(): CustomizationState {
  return {
    herName: 'Beautiful',
    yourName: 'Your Favorite Person',
    anniversaryDate: '2003-10-25',

    timelineEntries: [
      {
        title: 'The Day We First Met',
        note: 'The moment I saw you, I knew my life was about to change forever.',
        photo: '/photos/meet12.jpeg',
      },
      {
        title: 'The First Time You Made Me Smile',
        note: 'Your laugh is contagious, and that day I realized I wanted to hear it every day.',
        photo: '/photos/meet6.jpeg',
      },
      {
        title: 'Our Most Random Funny Moment',
        note: "Remember when we couldn't stop laughing? Those are the moments I treasure most.",
        photo: '/photos/meet20.jpeg',
      },
      {
        title: 'The Moment I Knew You Were Different',
        note: "You understood me in a way no one else ever has. That's when I knew.",
        photo: '/photos/meet16.jpeg',
      },
      {
        title: 'Today — Still Choosing You',
        note: 'Every single day, I choose you. And I always will.',
        photo: '/photos/meet5.jpeg',
      },
    ],

    flipCardMessages: [
      { message: 'Your smile melts me.', photo: '/photos/meet.jpeg' },
      { message: 'You make my bad days disappear.', photo: '/photos/meet5.jpeg' },
      { message: "You're my peace and my chaos.", photo: '/photos/meet13.jpeg' },
      { message: 'You understand me.', photo: '/photos/meet2.jpeg' },
      { message: "You're strong and soft at the same time.", photo: '/photos/meet8.jpeg' },
      { message: 'You make ordinary moments magical.', photo: '/photos/meet7.jpeg' },
      { message: 'Your laugh is my favorite sound.', photo: '/photos/meet14.jpeg' },
      { message: 'i miss you.', photo: '/photos/meet16.jpeg' },
      { message: 'You believe in me.', photo: '/photos/meet17.jpeg' },
      { message: "You're beautiful inside and out.", photo: '/photos/meet15.jpeg' },
      { message: 'You feel like home.', photo: '/photos/meet4.jpeg' },
      { message: 'I choose you. Every single day.', photo: '/photos/meet3.jpeg' },
    ],

    backgroundMusicUrl: '/assets/audio/default-romantic-track.mp3',
  };
}