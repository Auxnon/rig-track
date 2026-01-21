import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import HandTrackingCamera from './components/HandTrackingCamera';

const App = () => {
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'not-determined'>('not-determined');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setCameraPermission(status);
    })();
  }, []);

  if (cameraPermission === 'not-determined') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (cameraPermission === 'denied') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission denied</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HandTrackingCamera />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
});

export default App;
