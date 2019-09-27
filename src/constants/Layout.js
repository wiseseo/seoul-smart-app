import { Dimensions, Platform, PixelRatio } from 'react-native';

export const { width } = Dimensions.get('window');
export const { height } = Dimensions.get('window');
const scale = width / 320;
export const font = 12;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
