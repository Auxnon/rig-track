import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, ActivityIndicator} from 'react-native';
import {Camera, useCameraDevice, useFrameProcessor} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-worklets-core';
import * as tf from '@tensorflow/tfjs';
import {useHandTracking, HandLandmarks} from '../hooks/useHandTracking';
import HandOverlay from './HandOverlay';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const HandTrackingCamera = () => {
  const device = useCameraDevice('front');
  const camera = useRef<Camera>(null);
  const [hands, setHands] = useState<HandLandmarks[]>([]);
  const {detector, isModelLoading, detectHands} = useHandTracking();
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());

  // Process frames for hand detection
  const processFrame = async (frameData: any) => {
    if (!detector) {
      return;
    }

    try {
      // Convert frame to tensor (this is a simplified version)
      // In production, you'd use a more efficient conversion method
      const imageTensor = tf.browser.fromPixels({
        width: frameData.width,
        height: frameData.height,
        data: frameData.data,
      } as any);

      const detectedHands = await detectHands(imageTensor);
      setHands(detectedHands);

      // Cleanup tensor
      imageTensor.dispose();

      // Calculate FPS
      frameCount.current++;
      const now = Date.now();
      if (now - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = now;
      }
    } catch (error) {
      console.error('Error processing frame:', error);
    }
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    // Extract frame data and run detection on JS thread
    const frameData = {
      width: frame.width,
      height: frame.height,
      // Note: In production, use a proper frame buffer extraction
      data: new Uint8Array(frame.width * frame.height * 4),
    };
    runOnJS(processFrame)(frameData);
  }, [detector]);

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No camera device found</Text>
      </View>
    );
  }

  if (isModelLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00FF00" />
        <Text style={styles.text}>Loading hand tracking model...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
      <HandOverlay hands={hands} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>FPS: {fps}</Text>
        <Text style={styles.infoText}>Hands detected: {hands.length}</Text>
      </View>
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
  camera: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  infoContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 8,
  },
  infoText: {
    color: '#00FF00',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HandTrackingCamera;
