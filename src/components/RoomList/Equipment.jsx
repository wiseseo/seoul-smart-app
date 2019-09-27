import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import { font, normalize } from '../../constants/Layout';
import { NanumGothicExtraBold } from '../StyledText';

const styles = StyleSheet.create({
  text: {
    paddingVertical: normalize(font / 2),
    paddingHorizontal: normalize(font * 0.7),
    borderRadius: normalize(font),
    margin: normalize(font / 2),
    color: 'white',
    backgroundColor: Colors.mainColor,
  },
});

export default function Equipment({ text }) {
  return (
    <NanumGothicExtraBold style={styles.text}>{text}</NanumGothicExtraBold>
  );
}

Equipment.propTypes = {
  text: PropTypes.string.isRequired,
};
