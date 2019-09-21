import React, { useState } from 'react';
import { FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import Place from './Place';
import GET_PLACES from './query';

export default function PlaceList({ search }) {
  const [page, setPage] = useState(2);
  const { loading, error, data, fetchMore } = useQuery(GET_PLACES, {
    variables: { search },
  });

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;

  return (
    <FlatList
      data={data.getPlaces}
      keyExtractor={({ id }) => id}
      onEndReachedThreshold={1}
      onEndReached={() => {
        setPage(prev => prev + 1);
        fetchMore({
          variables: { page },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              getPlaces: [...prev.getPlaces, ...fetchMoreResult.getPlaces],
            };
          },
        });
      }}
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

PlaceList.propTypes = {
  search: PropTypes.string,
};
