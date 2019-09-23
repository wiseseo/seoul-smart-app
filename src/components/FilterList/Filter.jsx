/* eslint-disable react/prop-types */
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Program({ text, type, navigate }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate('Place', { [type]: text });
      }}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

Program.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
