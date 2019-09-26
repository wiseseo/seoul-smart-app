import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { NanumGothicBold } from '../StyledText';
import { width, font, normalize } from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: normalize(font / 2),
    borderColor: '#e2e2e3',
    borderWidth: 1,
  },
  image: {
    // flex: 1,
    alignSelf: 'stretch',
    height: normalize(width / 2),
    resizeMode: 'contain',
  },
  text: {
    padding: normalize(font / 2),
    fontSize: normalize(font * 1.1),
  },
});

export default function Program({ uri, title }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
      <NanumGothicBold style={styles.text}>{title}</NanumGothicBold>
    </View>
  );
}

Program.propTypes = {
  uri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
