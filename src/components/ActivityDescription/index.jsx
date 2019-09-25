/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CHANGE_ACTIVITY } from './query';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const state = ['recruit', 'pauserecruit', 'ongoing', 'done'];
const kor = ['모집 중', '모집 마감', '진행 중', '진행 마감'];

export default function ActivityDescription({
  id,
  name,
  type,
  place,
  date,
  startTime,
  endTime,
  room,
  total,
  content,
  status,
  participants,
  refetch,
  navigate,
}) {
  const days = `${date} ${startTime}~${endTime}`;
  const number = `${participants.length}/${total}명`;
  const [changeActivity] = useMutation(CHANGE_ACTIVITY);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          function AsyncAlert() {
            return new Promise(resolve => {
              Alert.alert(
                `활동상태가 ${kor[state.indexOf(status) + 1]}로 변경됩니다.`,
                '',
                [
                  {
                    text: '취소',
                    onPress: () => {
                      resolve(false);
                    },
                    style: 'cancel',
                  },
                  {
                    text: '확인',
                    onPress: () => {
                      resolve(true);
                    },
                  },
                ],
                { cancelable: true }
              );
            });
          }
          if (state.indexOf(status) < 3) {
            const accept = await AsyncAlert();
            if (accept) {
              changeActivity({
                variables: {
                  activityId: id,
                  status: state[state.indexOf(status) + 1],
                },
              });
              refetch({ variables: id });
            }
          }
        }}
      >
        <Text>{kor[state.indexOf(status)]}</Text>
      </TouchableOpacity>
      <Text>{name}</Text>
      <Text>{type}</Text>
      <Text>{status}</Text>
      <Text>{days}</Text>
      <Text>{place}</Text>
      <Text>{room}</Text>
      <TouchableOpacity
        onPress={() => navigate('Participants', { participants })}
      >
        <Text>{number}</Text>
      </TouchableOpacity>
      <Text>{content}</Text>
    </View>
  );
}

ActivityDescription.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
};
