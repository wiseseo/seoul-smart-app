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

export default function Place({ title, address, uri }) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{address}</Text>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
}

Place.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
};
