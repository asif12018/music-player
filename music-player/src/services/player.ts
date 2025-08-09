import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Track as RNTrack } from 'react-native-track-player';
import { Track } from '../store/playerStore';

export async function setupPlayer() {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
      Capability.SeekTo,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious],
    progressUpdateEventInterval: 1,
  });
}

export function toRNTrack(track: Track): RNTrack {
  return {
    id: track.id,
    url: track.localFileUri || track.streamUrl || '',
    title: track.title,
    artist: track.artist,
    artwork: track.artworkUrl,
    duration: track.durationSec,
    type: 'dash',
  } as RNTrack;
}

export async function loadQueue(tracks: Track[], startIndex = 0) {
  await TrackPlayer.reset();
  const rnTracks = tracks.map(toRNTrack).filter((t) => t.url);
  await TrackPlayer.add(rnTracks);
  if (rnTracks[startIndex]) {
    await TrackPlayer.skip(startIndex);
  }
}

export async function play() {
  await TrackPlayer.play();
}

export async function pause() {
  await TrackPlayer.pause();
}

export async function next() {
  try {
    await TrackPlayer.skipToNext();
  } catch {}
}

export async function previous() {
  try {
    await TrackPlayer.skipToPrevious();
  } catch {}
}

export async function seekTo(position: number) {
  await TrackPlayer.seekTo(position);
}

export async function setVolume(volume: number) {
  await TrackPlayer.setVolume(volume);
}