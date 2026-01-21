# Setup Guide for RigTrack

## Development Environment Setup

### Prerequisites

1. **Node.js and npm**
   - Install Node.js 18 or higher
   - Verify installation: `node --version` and `npm --version`

2. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

3. **For Android Development:**
   - Install Android Studio
   - Install Android SDK (API 34)
   - Install Android NDK (25.1.8937393)
   - Set up ANDROID_HOME environment variable
   - Add platform-tools to PATH

4. **For iOS Development (Mac only):**
   - Install Xcode 14 or higher
   - Install Xcode Command Line Tools: `xcode-select --install`
   - Install CocoaPods: `sudo gem install cocoapods`

## Project Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/Auxnon/rig-track.git
   cd rig-track
   npm install
   ```

2. **iOS Setup** (Mac only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Android Setup**
   - Open Android Studio
   - Open the `android` folder
   - Let Gradle sync complete
   - Alternatively, run: `cd android && ./gradlew clean`

## Running the App

### Start Metro Bundler
```bash
npm start
```

### Run on Android
```bash
# With a connected device or running emulator
npm run android

# Or manually
cd android
./gradlew installDebug
```

### Run on iOS (Mac only)
```bash
# Default simulator
npm run ios

# Specific device
npm run ios -- --device "iPhone 14 Pro"
```

## Troubleshooting

### Common Issues

1. **Metro Bundler Cache Issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **Android Build Failures**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

3. **iOS Pod Installation Issues**
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   ```

4. **Camera Permission Issues**
   - Make sure you're testing on a physical device
   - Check that permissions are granted in device settings
   - For Android: Settings > Apps > RigTrack > Permissions
   - For iOS: Settings > RigTrack > Camera

5. **TensorFlow Model Loading Issues**
   - Ensure stable internet connection for initial model download
   - Models are cached after first download
   - Check console logs for specific errors

### Performance Tips

1. **Enable Release Mode for Better Performance**
   - Android: `npm run android -- --variant=release`
   - iOS: Product > Scheme > Edit Scheme > Build Configuration > Release

2. **Reduce Frame Processing**
   - Adjust frame processing rate in `HandTrackingCamera.tsx`
   - Lower model resolution if needed

3. **Monitor Performance**
   - Use the FPS counter in the app
   - Check React Native DevTools
   - Use Android Studio Profiler or Xcode Instruments

## Development Workflow

1. **Making Changes**
   - Edit source files in `src/`
   - Changes will hot-reload automatically
   - Shake device to open developer menu

2. **Debugging**
   - Enable Remote JS Debugging from developer menu
   - Use React Native Debugger
   - Check logs: `npx react-native log-android` or `npx react-native log-ios`

3. **Linting**
   ```bash
   npm run lint
   ```

4. **Testing**
   ```bash
   npm test
   ```

## Key Technologies

- **react-native-vision-camera**: Camera access and frame processing
- **TensorFlow.js**: Machine learning runtime with WebGPU backend
- **MediaPipe Hands**: Pre-trained hand tracking model
- **react-native-skia**: Hardware-accelerated 2D rendering
- **Worklets**: High-performance frame processing

## Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html)
- [React Native Vision Camera](https://react-native-vision-camera.com/)
- [React Native Skia](https://shopify.github.io/react-native-skia/)
