/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CHANGE_ACTIVITY } from './query';
import { CANCEL_ACTIVITY, DELETE_ACTIVITY } from '../../queries';
import { WRITE_EDIT } from '../Form/queries';

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
  userId,
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
  text,
  refetch,
  navigate,
}) {
  const days = `${date} ${startTime}~${endTime}`;
  const number = `${participants.length}/${total}명`;
  const [changeActivity] = useMutation(CHANGE_ACTIVITY);
  const [writeEdit] = useMutation(WRITE_EDIT);
  const [cancelActivity] = useMutation(CANCEL_ACTIVITY);
  const [deleteActivity] = useMutation(DELETE_ACTIVITY);

  function AsyncAlert() {
    return new Promise(resolve => {
      Alert.alert(
        '정말 취소하시겠습니까?',
        '',
        [
          {
            text: '아니오',
            onPress: () => {
              resolve(false);
            },
            style: 'cancel',
          },
          {
            text: '네',
            onPress: () => {
              resolve(true);
            },
          },
        ],
        { cancelable: true }
      );
    });
  }

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
      {(text === '활동 상태 변경' && (
        <View>
          <TouchableOpacity
            onPress={async () => {
              writeEdit({
                variables: {
                  id,
                  name,
                  total,
                  date,
                  startTime,
                  endTime,
                  place,
                  room,
                  content,
                  type,
                },
              });
              navigate('Edit', { id, isExtend: true });
            }}
          >
            <Text>연장하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              const cancel = await AsyncAlert();
              if (cancel) {
                deleteActivity({ variables: { activityId: id } });
                navigate('Activity');
              }
            }}
          >
            <Text>개설취소</Text>
          </TouchableOpacity>
        </View>
      )) ||
        (text === '신청 완료' && (
          <TouchableOpacity
            onPress={async () => {
              const cancel = await AsyncAlert();
              if (cancel) {
                cancelActivity({
                  variables: { activityId: id, userId },
                });
                refetch({ variables: { id } });
              }
            }}
          >
            <Text>신청취소</Text>
          </TouchableOpacity>
        ))}
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
