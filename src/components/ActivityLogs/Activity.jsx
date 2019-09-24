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

export default function Activity({
  id,
  name,
  isLeader,
  date,
  startTime,
  endTime,
  place,
  room,
  status,
  participants,
  navigate,
}) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      {isLeader && (
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
          <Text>리더입니다</Text>
        </TouchableOpacity>
      )}
      <Text>{date}</Text>
      <Text>{startTime}</Text>
      <Text>{endTime}</Text>
      <Text>{place}</Text>
      <Text>{room}</Text>
      <Text>{status}</Text>
      <TouchableOpacity
        onPress={() => navigate('Participants', { participants })}
      >
        <Text>
          신청자보기
          {participants}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

Activity.defaultProps = {
  participants: [],
};

Activity.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isLeader: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object),
};
