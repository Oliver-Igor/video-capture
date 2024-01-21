import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { CameraViewProps } from './props'
import { Camera } from 'expo-camera';

export default function CameraView({
    cameraRef,
    isRecording,
    onRecord,
    onStopRecording,
}: CameraViewProps) {
  return (
    <Camera ref={cameraRef} style={styles.container}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={isRecording ? onStopRecording : onRecord} style={styles.buttonRecord}>
                <Text style={styles.text}>{isRecording ? 'Stop' : 'Record'}</Text>
            </TouchableOpacity>
        </View>
    </Camera>
  );
}