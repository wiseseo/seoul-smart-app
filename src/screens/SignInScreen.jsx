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

// const KK_ACCESS_TOKEN = 'Q9PKw97447-tCSMG8ilT_0rOjfZFYUCnAokxUQo9dJkAAAFtWS3BIQ';

const Auth = {
  naver: {
    authUrl: 'https://nid.naver.com/oauth2.0',
    appId: 'UJxRowek7VWI2fNRWzhf',
    appSecret: 'CedceOMq48',
    openApi: 'https://openapi.naver.com/v1/nid/me',
  },
  kakao: {
    authUrl: 'https://kauth.kakao.com/oauth',
    appId: 'df313a0df17197712d22e6efc080c3ab',
    appSecret: 'jnkxNjAjpBXtbMnfEdXRBI4uyBw3ADYm',
    openApi: 'https://kapi.kakao.com/v2/user/me',
  },
};

const REDIRECT_URI = AuthSession.getRedirectUrl();

function getAuthUrl(url, clientId, redirectUri) {
  return `${url}/authorize?response_type=code&state=sndkgjdkfmvsiw21j&client_id=${clientId}&redirect_uri=${redirectUri}`;
}

function getAccessUrl(url, clientId, clientSecret, code, social) {
  const addition =
    social === 'kakao'
      ? `redirect_uri=${REDIRECT_URI}`
      : `state=sndkgjdkfmvsiw21j`;
  return `${url}/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&${addition}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function SignInScreen({ navigation }) {
  async function signInAsync(token, data) {
    const name = data.response
      ? data.response.nickname
      : data.properties.nickname;
    // await AsyncStorage.setItem('token', token);
    // await AsyncStorage.setItem('name', name);
    console.log('token: ', token);
    console.log('name: ', name);
    navigation.navigate('Main');
  }

  async function handleGetUser(accessToken, social) {
    const { openApi } = Auth[social];
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    // GET resource-owner's nickname, access_token(header에 넣어 전송)
    const { data } = await axios.get(openApi, config);

    signInAsync(accessToken, data);
  }

  async function handleGetAccess(code, social) {
    // AUTHORIZE client id, client password, GET resource-owner's access token
    const { authUrl, appId, appSecret } = Auth[social];
    const uri = getAccessUrl(authUrl, appId, appSecret, code, social);
    const {
      data: { access_token },
    } = await axios.get(uri);
    handleGetUser(access_token, social);
  }

  async function handlePressAsync(social) {
    const redirectUrl =
      social === 'kakao' ? REDIRECT_URI : encodeURIComponent(REDIRECT_URI);

    // client id authorization
    const { authUrl, appId } = Auth[social];
    const {
      params: { code },
    } = await AuthSession.startAsync({
      authUrl: getAuthUrl(authUrl, appId, redirectUrl),
    });
    handleGetAccess(code, social);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressAsync('naver')}>
        <Text>네이버 아이디로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressAsync('kakao')}>
        <Text>카카오 아이디로 시작하기</Text>
      </TouchableOpacity>
      <Button title="Sign in!" onPress={signInAsync} />
    </View>
  );
}