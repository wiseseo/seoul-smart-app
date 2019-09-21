import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Program from './Program';
import GET_PROGRAMS from './query';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function SeoulPrograms() {
  const { loading, error, data } = useQuery(GET_PROGRAMS);

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;
  const { getPrograms } = data;
  console.log(getPrograms);
  return (
    <View style={styles.container}>
      <Program uri={getPrograms[0].image} title={getPrograms[0].title} />
    </View>
  );
}
