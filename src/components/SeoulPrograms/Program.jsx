import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Program({ uri, title }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} />
      <Text>{title}</Text>
    </View>
  );
}
