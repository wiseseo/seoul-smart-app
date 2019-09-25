/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const currentState = {
  recruit: '모집 중',
  pauserecruit: '모집 마감',
  ongoing: '진행 중',
  done: '진행 마감',
};

export default function ActivityDescription({
  name,
  type,
  place,
  date,
  startTime,
  endTime,
  room,
  total,
  content,
  status,
  participants,
  navigate,
}) {
  const days = `${date} ${startTime}~${endTime}`;
  const number = `${participants.length}/${total}명`;
  return (
    <View style={styles.container}>
      <Text>{currentState[status]}</Text>
      <Text>{name}</Text>
      <Text>{type}</Text>
      <Text>{status}</Text>
      <Text>{days}</Text>
      <Text>{place}</Text>
      <Text>{room}</Text>
      <TouchableOpacity
        onPress={() => navigate('Participants', { participants })}
      >
        <Text>{number}</Text>
      </TouchableOpacity>
      <Text>{content}</Text>
    </View>
  );
}

ActivityDescription.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
};
