import {Tensor3D} from '@tensorflow/tfjs';

/**
 * Frame buffer interface for camera frames
 */
export interface FrameBuffer {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray;
}

/**
 * Convert camera frame to TensorFlow tensor
 * TODO: Implement proper frame buffer conversion using react-native-vision-camera's
 * frame buffer API and @tensorflow/tfjs-react-native's image conversion utilities.
 * This is a placeholder that demonstrates the expected interface.
 */
export const frameToTensor = async (
  frame: FrameBuffer,
): Promise<Tensor3D | null> => {
  try {
    // TODO: In production, use proper frame buffer conversion
    // Example using @tensorflow/tfjs-react-native:
    // import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native';
    // const imageTensor = decodeJpeg(frameBuffer);
    
    const {width, height, data} = frame;

    // Placeholder - in production, use platform-specific conversion
    // This is a simplified representation for demonstration
    const imageTensor = {
      width,
      height,
      data,
    };

    // Placeholder: This needs proper implementation with RN-specific methods
    return imageTensor as any as Tensor3D;
  } catch (error) {
    console.error('Error converting frame to tensor:', error);
    return null;
  }
};

/**
 * Throttle function calls to improve performance
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Calculate distance between two points
 */
export const distance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/**
 * Check if hand is making a pinch gesture
 * Returns true if thumb tip and index finger tip are close
 */
export const isPinching = (keypoints: Array<{x: number; y: number}>): boolean => {
  if (keypoints.length < 21) {
    return false;
  }

  const thumbTip = keypoints[4];
  const indexTip = keypoints[8];

  const dist = distance(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);
  
  // Threshold for pinch detection (adjust based on camera resolution)
  return dist < 30;
};

/**
 * Check if hand is making a fist gesture
 */
export const isFist = (keypoints: Array<{x: number; y: number}>): boolean => {
  if (keypoints.length < 21) {
    return false;
  }

  const wrist = keypoints[0];
  const fingerTips = [
    keypoints[4],  // thumb
    keypoints[8],  // index
    keypoints[12], // middle
    keypoints[16], // ring
    keypoints[20], // pinky
  ];

  // Check if all finger tips are close to the wrist
  return fingerTips.every(tip => {
    const dist = distance(wrist.x, wrist.y, tip.x, tip.y);
    return dist < 100; // Adjust threshold as needed
  });
};
