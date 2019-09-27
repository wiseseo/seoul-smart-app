import React from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Program from './Program';
import GET_PROGRAMS from './query';
import Loading from '../Loading';
import Error from '../Error';
import Nothing from '../Nothing';

export default function SeoulPrograms() {
  const { loading, error, data } = useQuery(GET_PROGRAMS);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data.getPrograms.length) return <Nothing />;

  return (
    <FlatList
      numColumns={2}
      horizontal={false}
      data={data.getPrograms}
      keyExtractor={({ id }) => id}
      renderItem={({ item: { image, title, link } }) => (
        <Program uri={image} title={title} link={link} />
      )}
    />
  );
}
