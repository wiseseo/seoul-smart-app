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
      ? require('./../assets/images/drawable-xxxhdpi/MyPage_White.png')
      : require('./../assets/images/drawable-xxxhdpi/MyPage_Blue.png'),
    PlacePage: focused
      ? require('./../assets/images/drawable-xxxhdpi/PlacePage_White.png')
      : require('./../assets/images/drawable-xxxhdpi/PlacePage_Blue.png'),
    ActivityPage: focused
      ? require('./../assets/images/drawable-xxxhdpi/ActivityPage_White.png')
      : require('./../assets/images/drawable-xxxhdpi/ActivityPage_Blue.png'),
  };
  return <Image source={source[name]} style={styles.icon} />;
}

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};
