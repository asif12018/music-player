import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { searchYouTubeMusic } from '../services/youtube';
import { usePlayerStore, Track } from '../store/playerStore';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const setQueue = usePlayerStore((s) => s.setQueue);

  const apiKey = (Constants?.expoConfig?.extra as any)?.YOUTUBE_API_KEY || '';

  async function doSearch() {
    if (!apiKey) {
      alert('Set YOUTUBE_API_KEY in app config to use search.');
      return;
    }
    const data = await searchYouTubeMusic(apiKey, query);
    setResults(data.items || []);
  }

  function onPlay(item: any) {
    const tracks: Track[] = (results || []).map((it: any) => ({
      id: it.id.videoId || it.id,
      title: it.snippet.title,
      artist: it.snippet.channelTitle,
      artworkUrl: it.snippet.thumbnails?.medium?.url,
      youtubeVideoId: it.id.videoId || it.id,
    }));
    const startIndex = results.findIndex((r) => r === item);
    setQueue(tracks, startIndex >= 0 ? startIndex : 0);
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput
          placeholder="Search songs, albums, artists"
          value={query}
          onChangeText={setQuery}
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, height: 44 }}
        />
        <Button title="Search" onPress={doSearch} />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.videoId || item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPlay(item)} style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <Text numberOfLines={1}>{item.snippet.title}</Text>
            <Text numberOfLines={1} style={{ color: '#555' }}>{item.snippet.channelTitle}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}