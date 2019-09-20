import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function PlaceDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>장소 상세 화면</Text>
    </View>
  );
}

PlaceDetailScreen.navigationOptions = {
  title: '장소 상세 보기',
};
