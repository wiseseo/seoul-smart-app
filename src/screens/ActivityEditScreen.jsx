/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Form from '../components/Form';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default function ActivityEditScreen({ navigation }) {
  const [userId, setUser] = useState('');
  AsyncStorage.getItem('userId').then(value => {
    setUser(value);
  });
  const { id, place, room } = navigation.state.params;
  return (
    <View style={styles.container}>
      <Form
        navigation={navigation}
        id={id}
        selectedPlace={place}
        selectedRoom={room}
        userId={userId}
      />
    </View>
  );
}

ActivityEditScreen.navigationOptions = ({ navigation }) => ({
  title:
    navigation.state.params.id === 'new'
      ? '활동 개설 페이지'
      : '활동 수정 페이지',
});
