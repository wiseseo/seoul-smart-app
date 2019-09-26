/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
  NanumGothicBold,
  NanumGothic,
  NanumGothicExtraBold,
} from '../StyledText';
import { font, normalize } from '../../constants/Layout';
// import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderTopWidth: 1.4,
    borderTopColor: '#e2e2e3',
    alignSelf: 'stretch',
  },
  name: {
    fontSize: normalize(font * 1.2),
    marginBottom: 10,
  },
});

export default function Activity({ id, name, type, navigate }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('Detail', { id })}>
        <NanumGothicBold style={styles.name}>{name}</NanumGothicBold>
        <NanumGothic>{type}</NanumGothic>
      </TouchableOpacity>
    </View>
  );
}

Activity.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
