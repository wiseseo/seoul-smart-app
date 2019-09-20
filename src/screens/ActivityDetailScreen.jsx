import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ActivityDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>활동 상세 보기 페이지</Text>
    </View>
  );
}

ActivityDetailScreen.navigationOptions = {
  title: '활동 상세 보기',
};
