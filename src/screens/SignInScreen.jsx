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
// const KK_ACCESS_TOKEN = 'Q9PKw97447-tCSMG8ilT_0rOjfZFYUCnAokxUQo9dJkAAAFtWS3BIQ';

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
      // https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KK_APP_ID}&redirect_uri=${redirectUrl}&code={authorize_code}
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
      // https://kapi.kakao.com/v2/user/me
    } = await axios.get('https://openapi.naver.com/v1/nid/me', config);

    signInAsync(access_token, nickname);
  }

  async function handleNaverPressAsync() {
    const redirectUrl = AuthSession.getRedirectUrl();

    // client id authorization
    const result = await AuthSession.startAsync({
      // authUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${KK_APP_ID}&redirect_uri=${redirectUrl}&response_type=code`,
      authUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NV_APP_ID}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&state=${STATE_STRING}`,
    });
    handleNaverGetAccess(result.params.code);
  }

  async function handleKakaoGetAccess(code) {
    const redirectUrl = AuthSession.getRedirectUrl();
    // AUTHORIZE client id, client password, GET resource-owner's access token
    const {
      data: { access_token },
    } = await axios.get(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KK_APP_ID}&redirect_uri=${redirectUrl}&code=${code}`
    );

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    // GET resource-owner's nickname, access_token(header에 넣어 전송)
    const result = await axios.get(
      'https://kapi.kakao.com/v2/user/me',
      // &property_keys=%5B%22id%22,%20%22properties.nickname%22%5D
      config
    );

    signInAsync(access_token, result.data.properties.nickname);
  }

  async function handleKakaoPressAsync() {
    const redirectUrl = AuthSession.getRedirectUrl();

    // client id authorization
    const result = await AuthSession.startAsync({
      authUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${KK_APP_ID}&redirect_uri=${redirectUrl}&response_type=code`,
    });

    handleKakaoGetAccess(result.params.code);
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
