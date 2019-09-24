/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_ACTIVITY } from '../queries';
import ActivityDescription from '../components/ActivityDescription';
import ActivityButton from '../components/ActivityButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ActivityDetailScreen({ navigation }) {
  const id = navigation.getParam('id');
  const { loading, error, data } = useQuery(GET_ACTIVITY, {
    variables: { id },
  });

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

  return (
    <View style={styles.container}>
      <Text>활동 상세 보기 페이지</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Edit', { id: 'aaa' })}
      >
        <Text>편집(개설자)</Text>
      </TouchableOpacity>
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
      <ActivityButton
        status={status}
        participants={participants.map(participant => participant.userId)}
        leader={userId}
      />
    </View>
  );
}

ActivityDetailScreen.navigationOptions = {
  title: '활동 상세 보기',
};
