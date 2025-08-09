import axios from 'axios';

const YT_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideoItem {
  id: { kind: string; videoId?: string } | string;
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails?: { default?: { url: string }; medium?: { url: string }; high?: { url: string } };
  };
  contentDetails?: { duration?: string };
}

export async function searchYouTubeMusic(apiKey: string, query: string, maxResults = 25) {
  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: String(maxResults),
    q: query,
    type: 'video',
    videoCategoryId: '10',
  });
  const res = await axios.get(`${YT_BASE}/search?${params.toString()}&key=${apiKey}`);
  return res.data;
}

export async function getRelatedVideos(apiKey: string, videoId: string, maxResults = 25) {
  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: String(maxResults),
    relatedToVideoId: videoId,
    type: 'video',
  });
  const res = await axios.get(`${YT_BASE}/search?${params.toString()}&key=${apiKey}`);
  return res.data;
}