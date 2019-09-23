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
      renderItem={({
        item: {
          id,
          name,
          isLeader,
          date,
          startTime,
          endTime,
          place,
          room,
          status,
          participants,
        },
      }) => (
        <Activity
          key={id}
          id={id}
          name={name}
          isLeader={isLeader}
          date={date}
          startTime={startTime}
          endTime={endTime}
          place={place}
          room={room}
          status={status}
          participants={participants}
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
