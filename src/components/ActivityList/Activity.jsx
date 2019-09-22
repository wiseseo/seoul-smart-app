import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // flex: 1,
    // alignSelf: 'stretch',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default function Activity({ id, name, type, navigate }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('Detail', { id })}
    >
      <Text>{name}</Text>
      <Text>{type}</Text>
    </TouchableOpacity>
  );
}

Activity.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
