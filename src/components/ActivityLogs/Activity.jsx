/* eslint-disable react/prop-types */
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const state = ['recruit', 'pauserecruit', 'ongoing', 'done'];
const kor = ['모집 중', '모집 마감', '진행 중', '진행 마감'];

export default function Activity({
  id,
  name,
  isLeader,
  type,
  status,
  navigate,
}) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(
          'ActivityStack',
          {},
          NavigationActions.navigate({
            routeName: 'Detail',
            params: { id },
          })
        )
      }
    >
      <View style={styles.container}>
        <Text>{name}</Text>
        {isLeader && <Text>리더입니다</Text>}
        <Text>{type}</Text>
        <Text>{kor[state.indexOf(status)]}</Text>
      </View>
    </TouchableOpacity>
  );
}

Activity.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isLeader: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
