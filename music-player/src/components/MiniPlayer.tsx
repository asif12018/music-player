import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { usePlayerStore } from '../store/playerStore';
import { useNavigation } from '@react-navigation/native';

export default function MiniPlayer() {
  const { queue, currentIndex, isPlaying, togglePlayPause, next, previous } = usePlayerStore();
  const current = currentIndex >= 0 ? queue[currentIndex] : undefined;
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Player')}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#111', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white' }} numberOfLines={1}>
            {current?.title || 'Nothing playing'}
          </Text>
          {!!current && (
            <Text style={{ color: '#ccc' }} numberOfLines={1}>
              {current.artist || 'Unknown artist'}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={(e) => { e.stopPropagation(); previous(); }}>
          <Text style={{ color: 'white' }}>{'<<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => { e.stopPropagation(); togglePlayPause(); }}>
          <Text style={{ color: 'white' }}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => { e.stopPropagation(); next(); }}>
          <Text style={{ color: 'white' }}>{'>>'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}