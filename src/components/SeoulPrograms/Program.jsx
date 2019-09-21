import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },
});

export default function Program({ uri, title }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
      <Text>{title}</Text>
    </View>
  );
}
