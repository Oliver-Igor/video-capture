import React from 'react';
import { Button, SafeAreaView, View, } from 'react-native';

import { Video } from 'expo-av';

import { styles } from './styles';
import { VideoPlayerProps } from './props'

export default function VideoPlayer({video, onSave, onShare, onDiscard}: VideoPlayerProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Video source={{uri: video.uri}} useNativeControls isLooping style={styles.video}/>

      <View style={styles.menuButton}>
        <Button title="Salvar" onPress={onSave} />
        <Button title="Compartilhar" onPress={onShare} />
        <Button title="Descartar" onPress={onDiscard} />
      </View>
    </SafeAreaView>
  );
}