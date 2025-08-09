import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'music-player',
  slug: 'music-player',
  extra: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
};

export default config;