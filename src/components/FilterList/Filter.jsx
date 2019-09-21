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

export default function Program({ text }) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

Program.propTypes = {
  text: PropTypes.string.isRequired,
};
