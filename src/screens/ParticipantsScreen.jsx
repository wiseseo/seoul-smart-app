/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ParticipantsList from '../components/ParticipantsList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ParticipantsScreen({ navigation }) {
  const participants = navigation.getParam('participants');
  return (
    <View style={styles.container}>
      <ParticipantsList participants={participants} />
    </View>
  );
}

ParticipantsScreen.navigationOptions = {
  title: '신청자 보기',
};
