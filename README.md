# rig-track

A React Native hand tracking mobile app using TensorFlow.js with WebGPU backend and react-native-skia for rendering hand landmarks.

## Features

- **Real-time Hand Tracking**: Uses TensorFlow.js MediaPipe Hands model for accurate hand detection
- **WebGPU Backend**: Optimized performance with WebGPU acceleration
- **Skia Rendering**: Hardware-accelerated overlay rendering with react-native-skia
- **Multi-hand Support**: Detects up to 2 hands simultaneously
- **21 Keypoints**: Tracks 21 hand landmarks per hand
- **FPS Counter**: Real-time performance monitoring

## Architecture

### Key Technologies

- **react-native-vision-camera**: High-performance camera access with frame processors
- **@tensorflow/tfjs**: TensorFlow.js for machine learning
- **@tensorflow-models/hand-pose-detection**: Pre-trained hand tracking model
- **@shopify/react-native-skia**: Hardware-accelerated 2D graphics
- **react-native-worklets-core**: Efficient frame processing on separate thread

### Components

- `App.tsx`: Main application with camera permission handling
- `HandTrackingCamera.tsx`: Camera component with frame processing
- `HandOverlay.tsx`: Skia-based overlay for rendering hand landmarks
- `useHandTracking.ts`: Hook for TensorFlow hand detection logic

## Prerequisites

- Node.js >= 18
- React Native development environment set up
- For iOS: Xcode, CocoaPods
- For Android: Android Studio, JDK

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Auxnon/rig-track.git
cd rig-track
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios
pod install
cd ..
```

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Development

### Start Metro bundler
```bash
npm start
```

### Run linter
```bash
npm run lint
```

### Run tests
```bash
npm test
```

## How It Works

1. **Camera Capture**: The app uses `react-native-vision-camera` to capture frames from the front-facing camera
2. **Frame Processing**: Each frame is processed using a frame processor that runs on a separate worklet thread
3. **Hand Detection**: Frames are converted to tensors and passed to the TensorFlow.js MediaPipe Hands model
4. **Landmark Extraction**: The model returns 21 keypoints for each detected hand
5. **Rendering**: Hand landmarks are rendered as circles and connected lines using react-native-skia's Canvas API
6. **Performance**: The system tracks FPS and displays detection statistics in real-time

## Hand Landmarks

The MediaPipe Hands model detects 21 landmarks per hand:
- Wrist (0)
- Thumb (1-4)
- Index finger (5-8)
- Middle finger (9-12)
- Ring finger (13-16)
- Pinky (17-20)

## Performance Optimization

- WebGPU backend for TensorFlow acceleration
- Frame processing on separate worklet thread
- Hardware-accelerated Skia rendering
- Efficient tensor memory management
- Optimized hand model configuration

## Permissions

The app requires camera permissions to function:
- **iOS**: Configured in `Info.plist` with `NSCameraUsageDescription`
- **Android**: Configured in `AndroidManifest.xml` with `CAMERA` permission

## Troubleshooting

### iOS Build Issues
- Ensure CocoaPods are installed: `sudo gem install cocoapods`
- Clear Pods: `cd ios && pod deintegrate && pod install`

### Android Build Issues
- Clean build: `cd android && ./gradlew clean`
- Ensure Android SDK and NDK are properly installed

### Camera Not Working
- Check camera permissions are granted
- Ensure physical device is used (camera may not work on emulator/simulator)

## License

ISC

## Author

Built with the latest React Native and TensorFlow.js technologies for optimal hand tracking performance.