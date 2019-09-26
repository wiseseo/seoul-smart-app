/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Achievement from './Achievement';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default function UserInfo({ name, achievement }) {
  return (
    <View style={styles.container}>
      <Text>{name}님 ㅎㅇ</Text>
      <Achievement achievement={achievement} />
    </View>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  achievement: PropTypes.number.isRequired,
};
