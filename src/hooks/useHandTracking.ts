import {useEffect, useState} from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import {Keypoint} from '@tensorflow-models/hand-pose-detection';
import {initializeTensorFlow} from '../utils/tensorflow';

export interface HandLandmarks {
  keypoints: Keypoint[];
  score?: number;
}

export const useHandTracking = () => {
  const [detector, setDetector] = useState<handPoseDetection.HandDetector | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

  useEffect(() => {
    const initTensorFlow = async () => {
      try {
        // Initialize TensorFlow with WebGPU backend
        await initializeTensorFlow();
        console.log('TensorFlow initialized');

        // Create hand detector
        const model = handPoseDetection.SupportedModels.MediaPipeHands;
        const detectorConfig: handPoseDetection.MediaPipeHandsMediaPipeModelConfig = {
          runtime: 'mediapipe',
          modelType: 'full',
          maxHands: 2,
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
        };

        const handDetector = await handPoseDetection.createDetector(
          model,
          detectorConfig,
        );

        setDetector(handDetector);
        setIsModelLoading(false);
        console.log('Hand detector initialized');
      } catch (error) {
        console.error('Error initializing TensorFlow:', error);
        setIsModelLoading(false);
      }
    };

    initTensorFlow();

    return () => {
      if (detector) {
        detector.dispose();
      }
    };
  }, []);

  const detectHands = async (imageData: tf.Tensor3D): Promise<HandLandmarks[]> => {
    if (!detector) {
      return [];
    }

    try {
      const hands = await detector.estimateHands(imageData);
      return hands.map(hand => ({
        keypoints: hand.keypoints,
        score: hand.score,
      }));
    } catch (error) {
      console.error('Error detecting hands:', error);
      return [];
    }
  };

  return {
    detector,
    isModelLoading,
    detectHands,
  };
};
