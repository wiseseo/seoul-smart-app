import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Text>{achievement}</Text>
    </View>
  );
}

Achievement.propTypes = {
  achievement: PropTypes.number.isRequired,
};
