import React from 'react';
import { View, StyleSheet } from 'react-native';
import Room from './Room';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function RoomList({ rooms }) {
  const roomList = rooms.map(({ name, thumbnail, description, equipments }) => (
    <Room
      key={name}
      name={name}
      uri={thumbnail}
      description={description}
      equipments={equipments}
    />
  ));
  return <View style={styles.container}>{roomList}</View>;
}
