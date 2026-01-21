// Mock native modules for testing
jest.mock('react-native-vision-camera', () => ({
  Camera: {
    requestCameraPermission: jest.fn().mockResolvedValue('granted'),
    getCameraPermissionStatus: jest.fn().mockResolvedValue('granted'),
  },
  useCameraDevice: jest.fn().mockReturnValue({
    id: 'mock-camera',
    devices: ['front'],
  }),
  useFrameProcessor: jest.fn(),
}));

jest.mock('@shopify/react-native-skia', () => ({
  Canvas: 'Canvas',
  Circle: 'Circle',
  Line: 'Line',
  vec: jest.fn((x, y) => ({x, y})),
}));

jest.mock('react-native-reanimated', () => ({
  runOnJS: jest.fn(fn => fn),
}));
