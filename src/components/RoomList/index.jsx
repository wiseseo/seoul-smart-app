/* eslint-disable react/prop-types */
import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Room from './Room';

export default function RoomList({ rooms, place, selectable, navigate }) {
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
          selectable={selectable}
          place={place}
          navigate={navigate}
        />
      )}
    />
  );
}

RoomList.defaultProps = {
  selectable: false,
};

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  place: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
};
