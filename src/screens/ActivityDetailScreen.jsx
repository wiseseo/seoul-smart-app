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
import { useQuery } from '@apollo/react-hooks';
import { GET_ACTIVITY } from '../queries';
import ActivityDescription from '../components/ActivityDescription';
import ActivityButton from '../components/ActivityButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  detailContainner: {
    flex: 11,
    alignSelf: 'stretch',
  },
  bottomButton: {
    flex: 1,
    alignSelf: 'stretch',
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

  return (
    <View style={styles.container}>
      <View style={styles.detailContainner}>
        <ActivityDescription
          id={id}
          userId={user}
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
          text={buttoncontent}
          refetch={refetch}
          navigate={navigation.navigate}
        />
      </View>
      <View style={styles.bottomButton}>
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
    </View>
  );
}

ActivityDetailScreen.navigationOptions = {
  title: '활동 상세 보기',
};
