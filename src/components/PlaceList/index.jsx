import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
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

  console.log(data);
  // const programs = data.getPrograms.map(({ id, image, title }) => (
  //   <Program key={id} uri={image} title={title} />
  // ));
  return (
    <ScrollView style={styles.container}>
      <Place />
    </ScrollView>
  );
}
