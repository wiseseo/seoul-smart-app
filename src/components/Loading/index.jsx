import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { width, font, normalize } from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: width / 3,
    marginBottom: normalize(font),
    width: width / 3,
    height: width / 3,
    resizeMode: 'cover',
  },
});

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/loading.gif')}
        style={styles.image}
      />
    </View>
  );
}
