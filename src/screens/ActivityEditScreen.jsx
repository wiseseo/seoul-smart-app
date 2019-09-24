/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Form from '../components/Form';

const styles = StyleSheet.create({
  container: {
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
  const title = id === 'new' ? '활동 개설 페이지' : '활동 수정 페이지';
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>{title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>뒤로가기</Text>
        </TouchableOpacity>
        <Form
          navigate={navigation.navigate}
          id={id}
          selectedPlace={place}
          selectedRoom={room}
          userId={userId}
        />
      </View>
    </ScrollView>
  );
}

ActivityEditScreen.navigationOptions = {
  title: '활동 개설 페이지',
};
