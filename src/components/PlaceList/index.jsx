import React, { useState, useEffect } from 'react';
import { FlatList, Image } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import Place from './Place';
import GET_PLACES from './query';
import Nothing from '../Nothing';
import Error from '../Error';

export default function PlaceList({ search, facility, gu, navigate }) {
  const [page, setPage] = useState(2);
  const { loading, error, data, fetchMore } = useQuery(GET_PLACES, {
    variables: { search, facility, gu },
  });

  useEffect(() => {
    setPage(2);
  }, [facility, search, gu]);

  if (loading)
    return (
      <Image source={require('./../../assets/images/NoInformation.png')} />
    );
  if (error) return <Error />;
  if (!data.getPlaces.length) {
    return <Nothing />;
  }

  return (
    <FlatList
      style={{ alignSelf: 'stretch' }}
      data={data.getPlaces}
      keyExtractor={({ id }) => id}
      onEndReachedThreshold={1}
      onEndReached={() => {
        setPage(prev => prev + 1);
        fetchMore({
          variables: { search, facility, gu, page },
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
          id,
          name,
          thumbnail,
          location: { address },
        },
      }) => (
        <Place
          id={id}
          name={name}
          address={address}
          uri={thumbnail}
          navigate={navigate}
        />
      )}
    />
  );
}

PlaceList.defaultProps = {
  search: 'undefined',
  facility: '',
  gu: '',
};

PlaceList.propTypes = {
  search: PropTypes.string,
  facility: PropTypes.string,
  gu: PropTypes.string,
  navigate: PropTypes.func.isRequired,
};
