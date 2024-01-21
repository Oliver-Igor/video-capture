import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Camera, CameraRecordingOptions } from 'expo-camera';
import {shareAsync} from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'

import CameraView from './src/components/CameraView';
import VideoPlayer from './src/components/VideoPlayer';


export default function App() {
  const cameraRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<any>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [hasMediaLibraryPermission, setMediaLibraryPermission] = useState(false);


  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMicrophonePermission(microphonePermission.status === 'granted');
      setMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if(hasCameraPermission === false || hasMicrophonePermission === false) {
    return <Text>Não tem permição de camera e audio</Text>;
  }
  if(hasMediaLibraryPermission === false){
    return <Text>Não tem permição de biblioteca</Text>;
  }

  const recordVideo = () => {
    setIsRecording(true);
    const options: CameraRecordingOptions = {
      quality: '1080p',
      maxDuration: 60,
      mute: false,
    };

    if (cameraRef && cameraRef.current) {
      cameraRef.current.recordAsync(options).then((recordedVideo: any) => {
        setVideo(recordedVideo);
        setIsRecording(false);
      });
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (cameraRef && cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  if (video) {
    const shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    const discardVideo = () => setVideo(undefined);
    
    return (
      <VideoPlayer 
      video={video}
      onShare={shareVideo}
      onSave={saveVideo}
      onDiscard={discardVideo} />
    );
  }

  return (
    <CameraView 
    cameraRef={cameraRef}
    isRecording={isRecording}
    onRecord={recordVideo}
    onStopRecording={stopRecording}
    ></CameraView>
  );
}
