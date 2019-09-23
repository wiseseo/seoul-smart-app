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
}) {
  const days = `${date} ${startTime}~${endTime}`;
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{type}</Text>
      <Text>{days}</Text>
      <Text>{place}</Text>
      <Text>{total}</Text>
      <Text>{content}</Text>
      <Text>{room}</Text>
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
};
