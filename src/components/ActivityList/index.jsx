import React from 'react';
import { FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Activity from './Activity';
import GET_ACTIVITIES from './query';

export default function ActivityList() {
  const { loading, error, data } = useQuery(GET_ACTIVITIES);

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;
  return (
    <FlatList
      data={data.getActivities}
      keyExtractor={({ id }) => id}
      renderItem={({ item: { id, name, type } }) => (
        <Activity id={id} name={name} type={type} />
      )}
    />
  );
}
