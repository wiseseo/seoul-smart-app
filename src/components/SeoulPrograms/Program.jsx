import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
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

export default function Program({ uri, title, link }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        WebBrowser.openBrowserAsync(link);
      }}
    >
      <Image source={{ uri }} style={styles.image} />
      <NanumGothicBold style={styles.text}>{title}</NanumGothicBold>
    </TouchableOpacity>
  );
}

Program.propTypes = {
  uri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
