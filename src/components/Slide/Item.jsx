import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default function Item({ uri }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri }} />
    </View>
  );
}

Item.propTypes = {
  uri: PropTypes.string.isRequired,
};
