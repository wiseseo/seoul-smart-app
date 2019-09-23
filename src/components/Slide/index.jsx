import React from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import Item from './Item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    alignSelf: 'stretch',
  },
});

export default function Slide({ images }) {
  const thumbnails = images.map(uri => <Item key={uri} uri={uri} />);
  return (
    <View style={styles.container}>
      <Swiper
        loop
        // dotStyle={{ backgroundColor: '#ABB2FF' }}
        // activeDotStyle={{ backgroundColor: '#5966FF' }}
      >
        {thumbnails}
      </Swiper>
    </View>
  );
}

Slide.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
