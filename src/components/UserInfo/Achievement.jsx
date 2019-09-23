import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Achievement({ achievement }) {
  return (
    <ProgressCircle
      percent={achievement}
      radius={50}
      borderWidth={8}
      color="#0287cb"
      shadowColor="#bfe1f2"
      bgColor="#fff"
    >
      <Text style={{ fontSize: 18 }}>{`${achievement}/100`}</Text>
    </ProgressCircle>
  );
}

Achievement.propTypes = {
  achievement: PropTypes.number.isRequired,
};
