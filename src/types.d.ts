declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

declare module '@tensorflow/tfjs' {
  export * from '@tensorflow/tfjs-core';
  export * from '@tensorflow/tfjs-converter';
}

declare module '@tensorflow/tfjs-react-native';

declare module 'react-native-vision-camera' {
  import {Component} from 'react';
  import {ViewProps} from 'react-native';

  export class Camera extends Component<any> {
    static requestCameraPermission(): Promise<'granted' | 'denied' | 'restricted'>;
    static getCameraPermissionStatus(): Promise<'granted' | 'denied' | 'not-determined' | 'restricted'>;
  }

  export function useCameraDevice(position: 'front' | 'back'): any;
  export function useFrameProcessor(processor: (frame: any) => void, dependencies: any[]): any;
}

declare module 'react-native-worklets-core' {
  export function runOnJS<T extends (...args: any[]) => any>(fn: T): T;
}
