# RigTrack Architecture

## Overview

RigTrack is a React Native mobile application that performs real-time hand tracking using TensorFlow.js with MediaPipe Hands model and renders the detected hand landmarks using react-native-skia.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        React Native App                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │              │    │              │    │              │  │
│  │  App.tsx     │───▶│HandTracking  │───▶│HandOverlay   │  │
│  │              │    │Camera.tsx    │    │.tsx          │  │
│  │              │    │              │    │              │  │
│  └──────────────┘    └──────┬───────┘    └──────────────┘  │
│                             │                                │
│                             ▼                                │
│                    ┌─────────────────┐                       │
│                    │                 │                       │
│                    │ Frame Processor │                       │
│                    │   (Worklet)     │                       │
│                    │                 │                       │
│                    └────────┬────────┘                       │
│                             │                                │
├─────────────────────────────┼────────────────────────────────┤
│                             ▼                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              TensorFlow.js Runtime                   │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │        WebGPU Backend (Accelerated)          │   │    │
│  │  │  or WASM Backend (Fallback)                  │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  │                                                       │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │     MediaPipe Hands Model                    │   │    │
│  │  │     - 21 hand landmarks                      │   │    │
│  │  │     - Up to 2 hands                          │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                             │                                │
│                             ▼                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           react-native-skia Renderer                │    │
│  │  - Hardware accelerated 2D graphics                 │    │
│  │  - Canvas-based overlay                             │    │
│  └─────────────────────────────────────────────────────┘    │
│                             │                                │
├─────────────────────────────┼────────────────────────────────┤
│                             ▼                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │       react-native-vision-camera                    │    │
│  │  - Camera access                                    │    │
│  │  - Frame processor API                              │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. App Component (`src/App.tsx`)
- **Responsibility**: Application entry point, permission handling
- **Key Features**:
  - Requests camera permissions
  - Manages app-level state
  - Renders main camera component

### 2. HandTrackingCamera (`src/components/HandTrackingCamera.tsx`)
- **Responsibility**: Camera integration and frame processing orchestration
- **Key Features**:
  - Integrates react-native-vision-camera
  - Manages frame processor worklet
  - Coordinates hand detection with overlay rendering
  - Displays performance metrics (FPS, hand count)

### 3. HandOverlay (`src/components/HandOverlay.tsx`)
- **Responsibility**: Render hand landmarks and connections
- **Key Features**:
  - Uses react-native-skia for hardware-accelerated rendering
  - Draws 21 hand keypoints as circles
  - Connects keypoints with lines to show hand structure
  - Color-coded visualization (green for fingers, red for wrist)

### 4. useHandTracking Hook (`src/hooks/useHandTracking.ts`)
- **Responsibility**: TensorFlow.js and hand detection logic
- **Key Features**:
  - Initializes TensorFlow with WebGPU backend
  - Loads MediaPipe Hands model
  - Provides hand detection function
  - Manages model lifecycle

## Data Flow

1. **Camera Capture**
   ```
   Camera → Frame → Frame Processor (Worklet Thread)
   ```

2. **Frame Processing**
   ```
   Frame Buffer → Tensor Conversion → Hand Detection → Landmarks
   ```

3. **Rendering**
   ```
   Landmarks → State Update → Skia Overlay → Screen
   ```

## Performance Optimizations

### 1. Threading Model
- **Main Thread**: UI rendering, state management
- **Worklet Thread**: Frame processing (via react-native-worklets-core)
- **TensorFlow Thread**: Model inference (WebGPU/WASM)

### 2. WebGPU Acceleration
- TensorFlow.js uses WebGPU backend when available
- Falls back to WASM for compatibility
- Significant performance improvement over CPU backend

### 3. Frame Processing
- Throttling mechanism to limit processing rate
- Efficient tensor memory management
- Automatic tensor disposal to prevent memory leaks

### 4. Rendering Optimizations
- Hardware-accelerated Skia rendering
- Minimal re-renders through optimized state updates
- Efficient canvas drawing with batch operations

## Technology Stack

### Core Technologies
- **React Native 0.73.2**: Mobile framework
- **TypeScript 5.3.3**: Type safety
- **TensorFlow.js 4.15.0**: ML runtime
- **MediaPipe Hands**: Hand tracking model

### Native Integration
- **react-native-vision-camera 3.9.2**: Camera access
- **@shopify/react-native-skia 0.1.240**: 2D rendering
- **react-native-worklets-core 0.3.0**: High-performance JS execution

### Build Tools
- **Metro**: React Native bundler
- **Babel**: JavaScript transpilation
- **TypeScript**: Type checking

## Platform Support

### iOS (13.0+)
- Camera permissions via Info.plist
- CocoaPods dependency management
- Hardware acceleration support

### Android (API 24+)
- Camera permissions via AndroidManifest.xml
- Gradle build system
- OpenGL/Vulkan acceleration support

## Model Details

### MediaPipe Hands
- **Input**: RGB camera frame
- **Output**: 21 hand landmarks per hand (x, y, z coordinates)
- **Performance**: Real-time (30+ FPS on modern devices)
- **Accuracy**: High precision hand tracking
- **Model Size**: ~6.5MB (full model)

### Hand Landmarks (21 points)
```
0: Wrist
1-4: Thumb (CMC, MCP, IP, Tip)
5-8: Index finger (MCP, PIP, DIP, Tip)
9-12: Middle finger (MCP, PIP, DIP, Tip)
13-16: Ring finger (MCP, PIP, DIP, Tip)
17-20: Pinky (MCP, PIP, DIP, Tip)
```

## Future Enhancements

### Potential Features
1. **Gesture Recognition**: Detect specific hand gestures (thumbs up, peace sign, etc.)
2. **Hand Pose Classification**: Classify hand poses for interaction
3. **Multi-hand Tracking**: Track more than 2 hands
4. **3D Visualization**: Use z-coordinates for depth visualization
5. **Recording**: Save hand tracking sessions
6. **AR Integration**: Overlay virtual objects on hands

### Performance Improvements
1. **Model Optimization**: Use quantized or pruned models
2. **Frame Skipping**: Intelligent frame selection
3. **Resolution Scaling**: Dynamic resolution adjustment
4. **Caching**: Cache model predictions

## Development Guidelines

### Code Organization
```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
└── types.d.ts      # TypeScript definitions
```

### Best Practices
1. Use TypeScript for type safety
2. Follow React Native best practices
3. Optimize for mobile performance
4. Handle permissions properly
5. Implement error handling
6. Add loading states
7. Monitor memory usage

## References

- [TensorFlow.js](https://www.tensorflow.org/js)
- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html)
- [React Native Vision Camera](https://react-native-vision-camera.com/)
- [React Native Skia](https://shopify.github.io/react-native-skia/)
- [WebGPU](https://www.w3.org/TR/webgpu/)
