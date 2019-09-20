import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ParticipantsScreen() {
  return (
    <View style={styles.container}>
      <Text>신청자 리스트</Text>
    </View>
  );
}

ParticipantsScreen.navigationOptions = {
  title: '신청자 보기',
};
