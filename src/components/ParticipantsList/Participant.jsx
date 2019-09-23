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

export default function Participant({ name, comment }) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{comment}</Text>
    </View>
  );
}

Participant.propTypes = {
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};
