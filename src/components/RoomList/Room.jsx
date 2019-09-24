/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // flex: 1,
    // alignSelf: 'stretch',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default function Room({
  name,
  uri,
  description,
  equipments,
  place,
  selectable,
  navigate,
}) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Image source={{ uri }} style={styles.image} />
      <Text>{description}</Text>
      <Text>{equipments}</Text>
      {selectable && (
        <TouchableOpacity
          onPress={() =>
            navigate(
              'ActivityStack',
              {},
              NavigationActions.navigate('Edit', { place, name })
            )}
        >
          <Text>확인</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

Room.defaultProps = {
  selectable: false,
};

Room.propTypes = {
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  equipments: PropTypes.arrayOf(PropTypes.string).isRequired,
  place: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
};
