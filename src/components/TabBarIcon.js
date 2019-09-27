import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});

export default function TabBarIcon({ name, focused }) {
  const source = {
    MyPage: focused
      ? require('./../assets/images/MyPage_White.png')
      : require('./../assets/images/MyPage_Blue.png'),
    PlacePage: focused
      ? require('./../assets/images/PlacePage_White.png')
      : require('./../assets/images/PlacePage_Blue.png'),
    ActivityPage: focused
      ? require('./../assets/images/ActivityPage_White.png')
      : require('./../assets/images/ActivityPage_Blue.png'),
  };
  return <Image source={source[name]} style={styles.icon} />;
}

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};
