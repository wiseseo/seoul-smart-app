/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import Activity from './Activity';
import GET_ACTIVITIES from './query';

export default function ActivityList({ typeFilter, navigate }) {
  const [page, setPage] = useState(2);
  const [updating, setUpdating] = useState(false);
  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_ACTIVITIES,
    {
      variables: { type: typeFilter },
      // notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    setPage(2);
  }, [typeFilter]);

  if (loading) {
    updating || setUpdating(true);
    return <Text>로딩</Text>;
  }
  if (error) return <Text>에러</Text>;

  function onEndReached() {
    setPage(prev => prev + 1);
    fetchMore({
      variables: { page, type: typeFilter },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.getActivities.length) {
          setUpdating(false);
          return prev;
        }
        const [{ id }] = fetchMoreResult.getActivities.slice(-1);
        if (prev.getActivities.filter(activity => activity.id === id).length) {
          setUpdating(false);
          return prev;
        }
        return {
          getActivities: [
            ...prev.getActivities,
            ...fetchMoreResult.getActivities,
          ],
        };
      },
    });
  }
  return (
    <FlatList
      data={data.getActivities}
      refreshing={updating}
      onRefresh={() => refetch({ variables: { type: typeFilter } })}
      keyExtractor={({ id }) => id}
      onEndReachedThreshold={1}
      onEndReached={onEndReached}
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
