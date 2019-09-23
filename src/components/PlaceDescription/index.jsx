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

export default function PlaceDescription({
  name,
  address,
  contact,
  businessHour,
}) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{address}</Text>
      <Text>{contact}</Text>
      <Text>{businessHour}</Text>
    </View>
  );
}

PlaceDescription.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  businessHour: PropTypes.string.isRequired,
};
