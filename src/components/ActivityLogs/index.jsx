/* eslint-disable react/prop-types */
import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Activity from './Activity';

export default function ActivityLogs({ activityLogs, navigate }) {
  return (
    <FlatList
      data={activityLogs}
      keyExtractor={({ id }) => id}
      renderItem={({ item: { id, name, isLeader, status, type } }) => (
        <Activity
          key={id}
          id={id}
          name={name}
          isLeader={isLeader}
          status={status}
          type={type}
          navigate={navigate}
        />
      )}
    />
  );
}

ActivityLogs.defaultProps = {
  activityLogs: [],
};

ActivityLogs.propTypes = {
  activityLogs: PropTypes.arrayOf(PropTypes.object),
};
