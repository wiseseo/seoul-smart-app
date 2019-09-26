import React from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import Item from './Item';
import { height } from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    height: (height / 5) * 2,
  },
});

export default function Slide({ images }) {
  const thumbnails = images.map(uri => <Item key={uri} uri={uri} />);
  return (
    <View style={styles.container}>
      <Swiper loop dot={<></>} activeDot={<></>}>
        {thumbnails}
      </Swiper>
    </View>
  );
}

Slide.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
