/* eslint-disable react/prop-types */
import React from 'react';
import { View, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Achievement from './Achievement';
import { NanumGothicBold } from '../StyledText';
import { font, normalize } from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(font),
  },
});

export default function UserInfo({ name, achievement }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => AsyncStorage.clear()}>
        <NanumGothicBold>{name}</NanumGothicBold>
      </TouchableOpacity>
      <Achievement achievement={achievement} />
    </View>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  achievement: PropTypes.number.isRequired,
};
