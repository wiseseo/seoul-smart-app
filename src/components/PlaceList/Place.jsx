import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
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

export default function Place({ id, name, address, uri, navigate }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('Detail', { id })}
    >
      <Text>{name}</Text>
      <Text>{address}</Text>
      <Image source={{ uri }} style={styles.image} />
    </TouchableOpacity>
  );
}

Place.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};
