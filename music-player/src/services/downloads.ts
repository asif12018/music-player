import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DOWNLOADS_KEY = 'downloads-index-v1';

export interface DownloadEntry {
  id: string; // track id
  uri: string; // local file uri
  size?: number;
  createdAt: number;
  title?: string;
  artist?: string;
  artworkUrl?: string;
}

export async function loadDownloadsIndex(): Promise<Record<string, DownloadEntry>> {
  const raw = await AsyncStorage.getItem(DOWNLOADS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveDownloadsIndex(index: Record<string, DownloadEntry>) {
  await AsyncStorage.setItem(DOWNLOADS_KEY, JSON.stringify(index));
}

export async function removeDownload(id: string) {
  const index = await loadDownloadsIndex();
  const entry = index[id];
  if (entry) {
    try {
      await FileSystem.deleteAsync(entry.uri, { idempotent: true });
    } catch {}
    delete index[id];
    await saveDownloadsIndex(index);
  }
}

export async function downloadToFile(id: string, fromUrl: string, suggestedFilename?: string): Promise<DownloadEntry> {
  const dir = FileSystem.documentDirectory || FileSystem.cacheDirectory || FileSystem.bundleDirectory || FileSystem.cacheDirectory!;
  const sanitized = (suggestedFilename || `${id}.mp4`).replace(/[^a-zA-Z0-9_.-]/g, '_');
  const target = `${dir}${sanitized}`;
  const downloadResumable = FileSystem.createDownloadResumable(fromUrl, target);
  const result = await downloadResumable.downloadAsync();
  if (!result) {
    throw new Error('Download was cancelled or failed without a result');
  }
  const { uri } = result;
  const info = await FileSystem.getInfoAsync(uri, { size: true });
  const size = (info as any).size as number | undefined;
  const entry: DownloadEntry = { id, uri, size, createdAt: Date.now() };
  const index = await loadDownloadsIndex();
  index[id] = entry;
  await saveDownloadsIndex(index);
  return entry;
}