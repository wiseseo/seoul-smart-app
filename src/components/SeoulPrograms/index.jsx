import React from 'react';
import { FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Program from './Program';
import GET_PROGRAMS from './query';

export default function SeoulPrograms() {
  const { loading, error, data } = useQuery(GET_PROGRAMS);

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;
  return (
    <FlatList
      numColumns={2}
      horizontal={false}
      data={data.getPrograms}
      keyExtractor={({ id }) => id}
      renderItem={({ item: { image, title } }) => (
        <Program uri={image} title={title} />
      )}
    />
  );
}
