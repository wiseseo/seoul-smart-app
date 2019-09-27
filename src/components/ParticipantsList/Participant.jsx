import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { NanumGothic, NanumGothicBold } from '../StyledText';
import { font, normalize } from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: normalize(font),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#e2e2e3',
  },
  name: {
    backgroundColor: '#e2e2e3',
    alignSelf: 'stretch',
    paddingVertical: normalize(font),
    paddingHorizontal: normalize(font * 1.2),
    fontSize: normalize(font * 1.2),
  },
  comment: {
    alignSelf: 'stretch',
    paddingVertical: normalize(font),
    paddingHorizontal: normalize(font * 1.2),
  },
});

export default function Participant({ name, comment }) {
  return (
    <View style={styles.container}>
      <NanumGothicBold style={styles.name}>{name}</NanumGothicBold>
      <NanumGothic style={styles.comment}>{comment}</NanumGothic>
    </View>
  );
}

Participant.propTypes = {
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};
