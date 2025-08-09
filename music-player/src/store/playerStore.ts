import { create } from 'zustand';

export type Track = {
  id: string;
  title: string;
  artist?: string;
  artworkUrl?: string;
  durationSec?: number;
  streamUrl?: string; // when using direct URLs; not used if using WebView/embedded
  youtubeVideoId?: string; // for YouTube embed playback
  isDownloaded?: boolean;
  localFileUri?: string;
};

export type RepeatMode = 'off' | 'one' | 'all';

interface PlayerState {
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  volume: number; // 0..1

  setQueue: (tracks: Track[], startIndex?: number) => void;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  next: () => void;
  previous: () => void;
  seekTo: (positionSec: number) => void;
  setVolume: (volume: number) => void;
  setShuffle: (enabled: boolean) => void;
  setRepeat: (mode: RepeatMode) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  shuffle: false,
  repeat: 'off',
  volume: 1,

  setQueue: (tracks, startIndex = 0) => set({ queue: tracks, currentIndex: startIndex }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlayPause: () => set((s) => ({ isPlaying: !s.isPlaying })),
  next: () => {
    const { queue, currentIndex, repeat } = get();
    if (queue.length === 0) return;
    if (repeat === 'one') return; // stay on current
    const lastIndex = queue.length - 1;
    if (currentIndex < lastIndex) {
      set({ currentIndex: currentIndex + 1 });
    } else if (repeat === 'all') {
      set({ currentIndex: 0 });
    }
  },
  previous: () => {
    const { queue, currentIndex, repeat } = get();
    if (queue.length === 0) return;
    if (repeat === 'one') return;
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    } else if (repeat === 'all') {
      set({ currentIndex: queue.length - 1 });
    }
  },
  seekTo: (_positionSec: number) => {
    // Implementation delegated to player service
  },
  setVolume: (volume: number) => set({ volume }),
  setShuffle: (enabled: boolean) => set({ shuffle: enabled }),
  setRepeat: (mode: RepeatMode) => set({ repeat: mode }),
}));