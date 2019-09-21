import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Program from './Program';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function SeoulPrograms() {
  return (
    <View style={styles.container}>
      <Program />
    </View>
  );
}
