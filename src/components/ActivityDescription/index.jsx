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
  status,
}) {
  const days = `${date} ${startTime}~${endTime}`;
  const totals = `${total}명`;
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{type}</Text>
      <Text>{status}</Text>
      <Text>{days}</Text>
      <Text>{place}</Text>
      <Text>{room}</Text>
      <Text>{totals}</Text>
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
};
