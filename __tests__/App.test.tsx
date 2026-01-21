import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../src/App';

// Mock camera permission
jest.mock('react-native-vision-camera', () => ({
  Camera: {
    requestCameraPermission: jest.fn().mockResolvedValue('granted'),
  },
}));

describe('App', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);
    // App should request camera permission on mount
    expect(getByText(/camera/i) || getByText(/permission/i)).toBeTruthy();
  });
});
