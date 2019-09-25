/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ACTIVITY, CANCEL_ACTIVITY, DELETE_ACTIVITY } from '../queries';
import ActivityDescription from '../components/ActivityDescription';
import ActivityButton from '../components/ActivityButton';
// import { WRITE_EDIT } from '../components/Form/queries';

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

  // const [writeEdit] = useMutation(WRITE_EDIT);

  const [cancelActivity] = useMutation(CANCEL_ACTIVITY);
  const [deleteActivity] = useMutation(DELETE_ACTIVITY);

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;

  const {
    name,
    type,
    leader: { userId },
    participants,
    days,
    total,
    content,
    status,
  } = data.findActivity;
  const [{ date, startTime, endTime, place, room }] = days.slice(-1);

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
      <Text>활동 상세 보기 페이지</Text>
      {(buttoncontent === '활동 상태 변경' && (
        <View>
          <TouchableOpacity
            onPress={async () => {
              navigation.navigate('Edit', { id, isExtend: true });
            }}
          >
            <Text>연장하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              const cancel = await AsyncAlert();
              if (cancel) {
                deleteActivity({ variables: { activityId: id } });
                navigation.navigate('Activity');
              }
            }}
          >
            <Text>개설취소</Text>
          </TouchableOpacity>
        </View>
      )) ||
        (buttoncontent === '신청 완료' && (
          <TouchableOpacity
            onPress={async () => {
              const cancel = await AsyncAlert();
              if (cancel) {
                cancelActivity({ variables: { activityId: id, userId: user } });
                refetch({ variables: { id } });
              }
            }}
          >
            <Text>신청취소</Text>
          </TouchableOpacity>
        ))}
      <ActivityDescription
        id={id}
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
        refetch={refetch}
        navigate={navigation.navigate}
      />
      <ActivityButton
        text={buttoncontent}
        userId={user}
        activityId={id}
        refetch={refetch}
        name={name}
        type={type}
        place={place}
        date={date}
        startTime={startTime}
        endTime={endTime}
        total={total}
        content={content}
        room={room}
        navigate={navigation.navigate}
      />
    </View>
  );
}

ActivityDetailScreen.navigationOptions = {
  title: '활동 상세 보기',
};
