import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useBack(callback) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', callback);
    return () => BackHandler.removeEventListener('hardwareBackPress', callback);
  }, []);
}
