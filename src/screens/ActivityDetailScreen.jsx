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
import { GET_ACTIVITY, CANCEL_ACTIVITY, DELETE_ACTIVITY } from '../queries';
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
  const { loading, error, data, refetch } = useQuery(GET_ACTIVITY, {
    variables: { id },
  });

  const [writeEdit] = useMutation(WRITE_EDIT);

  const [cancelActivity] = useMutation(CANCEL_ACTIVITY);
  const [deleteActivity] = useMutation(DELETE_ACTIVITY);

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

  function getText(leader, recruit, parts) {
    if (!leader) {
      if (recruit) {
        if (parts) return '신청 완료';
        return '신청';
      }
      return '모집 마감';
    }
    return '활동 상태 변경';
  }

  const isLeader = userId === user;
  const isRecruit = status === 'recruit';
  const isUser = participants
    .map(participant => participant.userId)
    .some(userid => userid === user);
  const buttoncontent = getText(isLeader, isRecruit, isUser);
  return (
    <View style={styles.container}>
      <Text>활동 상세 보기 페이지</Text>
      {(buttoncontent === '활동 상태 변경' && (
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
              navigation.navigate('Edit', { id });
            }}
          >
            <Text>편집</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteActivity({ variables: { activityId: id } });
              refetch({ variables: { id } });
            }}
          >
            <Text>개설취소</Text>
          </TouchableOpacity>
        </View>
      )) ||
        (buttoncontent === '신청 완료' && (
          <TouchableOpacity
            onPress={() => {
              cancelActivity({ variables: { activityId: id, userId: user } });
              refetch({ variables: { id } });
            }}
          >
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
        participants={participants}
        navigate={navigation.navigate}
      />
      <ActivityButton
        text={buttoncontent}
        userId={user}
        activityId={id}
        refetch={refetch}
      />
    </View>
  );
}

ActivityDetailScreen.navigationOptions = {
  title: '활동 상세 보기',
};
