import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Room from './Room';

export default function RoomList({ rooms }) {
  return (
    <FlatList
      data={rooms}
      keyExtractor={({ name }) => name}
      renderItem={({ item: { name, thumbnail, description, equipments } }) => (
        <Room
          name={name}
          uri={thumbnail}
          description={description}
          equipments={equipments}
        />
      )}
    />
  );
}

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
};
