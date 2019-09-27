import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { font, normalize } from '../../constants/Layout';

const styles = StyleSheet.create({
  image: {
    marginVertical: normalize(font),
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default function Logo() {
  return (
    <Image
      source={require('./../../assets/images/logo.png')}
      style={styles.image}
    />
  );
}
