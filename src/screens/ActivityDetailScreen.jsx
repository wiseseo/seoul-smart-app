import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_ACTIVITY } from '../queries';
import ActivityDescription from '../components/ActivityDescription';

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

  console.log(data);
  const {
    name,
    type,
    days: [{ date, startTime, endTime, place, room }],
    total,
    content,
  } = data.findActivity;

  return (
    <View style={styles.container}>
      <Text>활동 상세 보기 페이지</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Edit', { id: 'aaa' })}
      >
        <Text>편집(개설자)</Text>
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
        />
      </TouchableOpacity>
    </View>
  );
}

ActivityDetailScreen.navigationOptions = {
  title: '활동 상세 보기',
};
