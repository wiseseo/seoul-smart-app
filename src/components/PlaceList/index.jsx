import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Place from './Place';
import GET_PLACES from './query';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function PlaceList() {
  const { loading, error, data } = useQuery(GET_PLACES);

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;

  console.log(data.getPlaces);
  // const programs = data.getPrograms.map(({ id, image, title }) => (
  //   <Program key={id} uri={image} title={title} />
  // ));

  return (
    <FlatList
      data={data.getPlaces}
      keyExtractor={({ id }) => id}
      onEndReachedThreshold={1}
      renderItem={({
        item: {
          name,
          thumbnail,
          location: { address },
        },
      }) => <Place name={name} address={address} uri={thumbnail} />}
    />
  );
}
