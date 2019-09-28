import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
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
