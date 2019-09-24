/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ACTIVITY } from '../queries';
import ActivityDescription from '../components/ActivityDescription';
import ActivityButton from '../components/ActivityButton';
import { WRITE_EDIT } from '../components/Form/queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ActivityDetailScreen({ navigation }) {
  const id = navigation.getParam('id');
  const [user, setUser] = useState('');
  async function getUserId() {
    const item = await AsyncStorage.getItem('userId');
    setUser(item);
  }
  useEffect(() => {
    getUserId();
  }, []);
  const { loading, error, data } = useQuery(GET_ACTIVITY, {
    variables: { id },
  });
  const [writeEdit] = useMutation(WRITE_EDIT);

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;
  const {
    name,
    type,
    leader: { userId },
    participants,
    days: [{ date, startTime, endTime, place, room }],
    total,
    content,
    status,
  } = data.findActivity;

  const text = {
    apply: '신청',
    applyCheck: '신청 완료',
    finish: '모집 마감',
    change: '활동 상태 변경',
  };

  function putText(leader, recruit, parts) {
    if (!leader) {
      if (recruit) {
        if (parts) return 'applyCheck';
        return 'apply';
      }
      return 'finish';
    }
    return 'change';
  }

  const isLeader = userId === user;
  const arrayParticipants = participants.map(participant => participant.userId);
  const isRecruit = status === 'recruit';
  const isUser = arrayParticipants.some(userid => userid === user);
  const result = putText(isLeader, isRecruit, isUser);
  const buttoncontent = text[result];

  return (
    <View style={styles.container}>
      <Text>활동 상세 보기 페이지</Text>
      {(result === 'change' && (
        <View>
          <TouchableOpacity
            onPress={() => {
              writeEdit({
                variables: {
                  id,
                  name,
                  type,
                  date,
                  startTime,
                  endTime,
                  total,
                  content,
                  place,
                  room,
                },
              });
              navigation.navigate('Edit', { id: 'aaa' });
            }}
          >
            <Text>편집</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>개설취소</Text>
          </TouchableOpacity>
        </View>
      )) ||
        (result === 'applyCheck' && (
          <TouchableOpacity>
            <Text>신청취소</Text>
          </TouchableOpacity>
        ))}
      <ActivityDescription
        name={name}
        type={type}
        place={place}
        date={date}
        startTime={startTime}
        endTime={endTime}
        total={total}
        content={content}
        room={room}
        status={status}
      />
      <ActivityButton text={buttoncontent} userId={user} activityId={id} />
    </View>
  );
}

ActivityDetailScreen.navigationOptions = {
  title: '활동 상세 보기',
};
