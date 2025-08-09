import React from 'react';
import { View, Text } from 'react-native';
import { usePlayerStore } from '../store/playerStore';
import YouTubeWebPlayer from '../components/YouTubeWebPlayer';

export default function PlayerScreen() {
  const { queue, currentIndex } = usePlayerStore();
  const current = currentIndex >= 0 ? queue[currentIndex] : undefined;

  return (
    <View style={{ flex: 1 }}>
      {!!current?.youtubeVideoId && (
        <YouTubeWebPlayer videoId={current.youtubeVideoId} />
      )}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }} numberOfLines={1}>
          {current?.title || 'Nothing playing'}
        </Text>
        {!!current && (
          <Text style={{ color: '#555' }} numberOfLines={1}>
            {current.artist || 'Unknown artist'}
          </Text>
        )}
      </View>
    </View>
  );
}