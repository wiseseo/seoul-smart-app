import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { width } from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: '100%',
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
