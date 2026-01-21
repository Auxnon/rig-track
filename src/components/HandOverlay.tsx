import React from 'react';
import {Canvas, Circle, Line, vec} from '@shopify/react-native-skia';
import {StyleSheet} from 'react-native';
import {HandLandmarks} from '../hooks/useHandTracking';

interface HandOverlayProps {
  hands: HandLandmarks[];
  width: number;
  height: number;
}

// Hand landmark connections (MediaPipe hand model)
const HAND_CONNECTIONS = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index finger
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle finger
  [0, 9], [9, 10], [10, 11], [11, 12],
  // Ring finger
  [0, 13], [13, 14], [14, 15], [15, 16],
  // Pinky
  [0, 17], [17, 18], [18, 19], [19, 20],
  // Palm
  [5, 9], [9, 13], [13, 17],
];

const HandOverlay: React.FC<HandOverlayProps> = ({hands, width, height}) => {
  return (
    <Canvas style={[styles.canvas, {width, height}]}>
      {hands.map((hand, handIndex) => (
        <React.Fragment key={handIndex}>
          {/* Draw connections between keypoints */}
          {HAND_CONNECTIONS.map((connection, connIndex) => {
            const [startIdx, endIdx] = connection;
            const startPoint = hand.keypoints[startIdx];
            const endPoint = hand.keypoints[endIdx];

            if (startPoint && endPoint) {
              return (
                <Line
                  key={`connection-${handIndex}-${connIndex}`}
                  p1={vec(startPoint.x, startPoint.y)}
                  p2={vec(endPoint.x, endPoint.y)}
                  color="#00FF00"
                  style="stroke"
                  strokeWidth={2}
                />
              );
            }
            return null;
          })}

          {/* Draw keypoints */}
          {hand.keypoints.map((keypoint, keypointIndex) => (
            <Circle
              key={`keypoint-${handIndex}-${keypointIndex}`}
              cx={keypoint.x}
              cy={keypoint.y}
              r={keypointIndex === 0 ? 8 : 5} // Larger circle for wrist
              color={keypointIndex === 0 ? '#FF0000' : '#00FF00'}
            />
          ))}
        </React.Fragment>
      ))}
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default HandOverlay;
