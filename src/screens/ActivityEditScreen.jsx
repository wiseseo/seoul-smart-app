/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import Form from '../components/Form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ActivityEditScreen({ navigation }) {
  const [userId, setUser] = useState('');
  AsyncStorage.getItem('userId').then(value => {
    setUser(value);
  });
  const { id, place, room, refetch } = navigation.state.params;

  return (
    <View style={styles.container}>
      <Form
        navigation={navigation}
        id={id}
        selectedPlace={place}
        selectedRoom={room}
        userId={userId}
        refetch={refetch}
      />
    </View>
  );
}

ActivityEditScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.id === 'new' ? '활동개설' : '활동수정',
});
