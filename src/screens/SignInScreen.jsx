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

const KK_APP_ID = 'df313a0df17197712d22e6efc080c3ab';
const KK_ACCESS_TOKEN =
  'Q9PKw97447-tCSMG8ilT_0rOjfZFYUCnAokxUQo9dJkAAAFtWS3BIQ';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function SignInScreen({ navigation }) {
  async function signInAsync(token, nickname) {
    // await AsyncStorage.setItem('token', token);
    // await AsyncStorage.setItem('name', name);
    console.log('token: ', token);
    console.log('name: ', nickname);
    navigation.navigate('Main');
  }

  async function handleNaverGetAccess(code) {
    // AUTHORIZE client id, client password, GET resource-owner's access token
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
    // GET resource-owner's nickname, access_token(header에 넣어 전송)
    const {
      data: {
        response: { nickname },
      },
    } = await axios.get('https://openapi.naver.com/v1/nid/me', config);

    signInAsync(access_token, nickname);
  }

  async function handleNaverPressAsync() {
    const redirectUrl = AuthSession.getRedirectUrl();

    // client id authorization
    const result = await AuthSession.startAsync({
      authUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NV_APP_ID}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&state=${STATE_STRING}`,
    });
    handleNaverGetAccess(result.params.code);
  }

  // client id authorization
  async function handleKakaoPressAsync() {
    const redirectUrl = AuthSession.getRedirectUrl();

    const result = await AuthSession.startAsync({
      authUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${KK_APP_ID}&redirect_uri=${redirectUrl}&response_type=code`,
    });

    const {
      data: { access_token },
    } = await axios.get(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KK_APP_ID}&redirect_uri=${redirectUrl}&response_type=code&property_keys=%5B%22nickname%22%5D`
    );

    const config = {
      headers: {
        Authorization: `Bearer ${KK_ACCESS_TOKEN}`,
      },
    };

    const {
      data: {
        response: { nickname },
      },
    } = await axios.get('https://kapi.kakao.com/v2/user/me', config);

    signInAsync(KK_ACCESS_TOKEN, nickname);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNaverPressAsync}>
        <Text>네이버 아이디로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleKakaoPressAsync}>
        <Text>카카오 아이디로 시작하기</Text>
      </TouchableOpacity>
      <Button title="Sign in!" onPress={signInAsync} />
    </View>
  );
}
