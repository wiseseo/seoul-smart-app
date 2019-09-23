import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
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

export default function Room({ name, uri, description, equipments }) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Image source={{ uri }} style={styles.image} />
      <Text>{description}</Text>
      <Text>{equipments}</Text>
    </View>
  );
}

Room.propTypes = {
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  equipments: PropTypes.arrayOf(PropTypes.string).isRequired,
};
