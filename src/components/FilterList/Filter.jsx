/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { font, normalize } from '../../constants/Layout';
import { NanumGothicBold } from '../StyledText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e2e3',
    padding: normalize(font),
    marginBottom: normalize(font),
  },
});

export default function Program({ text, type, navigate }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate('Place', { [type]: text });
      }}
    >
      <NanumGothicBold style={{ fontSize: normalize(font * 1.1) }}>
        {text}
      </NanumGothicBold>
    </TouchableOpacity>
  );
}

Program.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
