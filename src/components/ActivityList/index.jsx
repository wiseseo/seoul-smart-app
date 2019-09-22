/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import Activity from './Activity';
import GET_ACTIVITIES from './query';

export default function ActivityList({ typeFilter, navigate }) {
  const [page, setPage] = useState(2);
  const { loading, error, data, fetchMore } = useQuery(GET_ACTIVITIES, {
    variables: { type: typeFilter },
  });

  useEffect(() => {
    setPage(2);
  }, [typeFilter]);

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;
  return (
    <FlatList
      data={data.getActivities}
      initialNumToRender={1}
      keyExtractor={({ id }) => id}
      onEndReachedThreshold={1}
      onEndReached={() => {
        setPage(prev => prev + 1);
        fetchMore({
          variables: { page, type: typeFilter },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.getActivities.length) return prev;
            const [{ id }] = fetchMoreResult.getActivities.slice(-1);
            if (
              prev.getActivities.filter(activity => activity.id === id).length
            )
              return prev;
            return {
              getActivities: [
                ...prev.getActivities,
                ...fetchMoreResult.getActivities,
              ],
            };
          },
        });
      }}
      renderItem={({ item: { id, name, type } }) => (
        <Activity id={id} name={name} type={type} navigate={navigate} />
      )}
    />
  );
}

ActivityList.defaultProps = {
  typeFilter: '',
};

ActivityList.propTypes = {
  typeFilter: PropTypes.string,
};
