import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Activity({
  name,
  isLeader,
  date,
  startTime,
  endTime,
  place,
  room,
  status,
  participants,
}) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{isLeader}</Text>
      <Text>{date}</Text>
      <Text>{startTime}</Text>
      <Text>{endTime}</Text>
      <Text>{place}</Text>
      <Text>{room}</Text>
      <Text>{status}</Text>
      <Text>{participants}</Text>
    </View>
  );
}

Activity.propTypes = {
  name: PropTypes.string.isRequired,
  isLeader: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
};
