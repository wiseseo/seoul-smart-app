import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Program from './Program';
import GET_PROGRAMS from './query';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function SeoulPrograms() {
  const { loading, error, data } = useQuery(GET_PROGRAMS);

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;

  const programs = data.getPrograms.map(({ id, image, title }) => (
    <Program key={id} uri={image} title={title} />
  ));
  return <ScrollView style={styles.container}>{programs}</ScrollView>;
}
