import { Dimensions } from 'react-native';

export const {width} = Dimensions.get('window');
export const {height} = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
