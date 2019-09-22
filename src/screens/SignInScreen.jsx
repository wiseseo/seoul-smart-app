/* eslint-disable react/prop-types */
import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { AuthSession } from 'expo';
import axios from 'axios';

const NV_APP_ID = 'UJxRowek7VWI2fNRWzhf';
const NV_APP_SECRET = 'CedceOMq48';
const STATE_STRING = 'sndkgjdkfmvsiw21j';

// const KK_APP_ID = 'b46cd5f7008567fe15d23d72d4e34040';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function SignInScreen({ navigation }) {
  async function signInAsync(token, name) {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('name', name);
    navigation.navigate('Main');
  }

  async function handleGetAccess(code) {
    const {
      data: { access_token },
    } = await axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NV_APP_ID}&client_secret=${NV_APP_SECRET}&code=${code}&state=${STATE_STRING}`
    );

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

<<<<<<< HEAD
    const { data } = await axios.get('https://openapi.naver.com/v1/nid/me', config);
    console.log('data: ', data);
    setUser(data);
    console.log('user : ', user);
=======
    const {
      data: {
        response: { name },
      },
    } = await axios.get('https://openapi.naver.com/v1/nid/me', config);
>>>>>>> 794effb702a5d238201d6bf725a71ca8d7828df1

    signInAsync(access_token, name);
  }

  async function handlePressAsync() {
    const redirectUrl = AuthSession.getRedirectUrl();

    const result = await AuthSession.startAsync({
      authUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NV_APP_ID}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&state=${STATE_STRING}`,
    });
    handleGetAccess(result.params.code);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressAsync}>
        <Text>네이버 아이디로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>카카오 아이디로 시작하기</Text>
      </TouchableOpacity>
      <Button title="Sign in!" onPress={signInAsync} />
    </View>
  );
}
