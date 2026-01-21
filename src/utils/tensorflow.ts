import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

let isInitialized = false;

/**
 * Initialize TensorFlow with WebGPU backend
 * Falls back to WASM if WebGPU is not available
 */
export const initializeTensorFlow = async (): Promise<void> => {
  if (isInitialized) {
    return;
  }

  try {
    // Wait for TensorFlow to be ready
    await tf.ready();

    // Try to set WebGPU backend if available
    try {
      const webGPUBackend = await tf.setBackend('webgpu');
      if (webGPUBackend) {
        console.log('TensorFlow initialized with WebGPU backend');
      } else {
        throw new Error('WebGPU backend not available');
      }
    } catch (webGPUError) {
      console.warn('WebGPU not available, falling back to default backend:', webGPUError);
      // Will use the default backend (CPU or WASM)
    }

    await tf.ready();
    console.log('TensorFlow backend:', tf.getBackend());
    
    isInitialized = true;
  } catch (error) {
    console.error('Error initializing TensorFlow:', error);
    throw error;
  }
};

/**
 * Get current TensorFlow backend information
 */
export const getBackendInfo = (): {
  backend: string;
  isWebGPU: boolean;
} => {
  const backend = tf.getBackend();
  return {
    backend,
    isWebGPU: backend === 'webgpu',
  };
};

/**
 * Clean up TensorFlow resources
 */
export const cleanupTensorFlow = (): void => {
  tf.disposeVariables();
  console.log('TensorFlow resources cleaned up');
};
