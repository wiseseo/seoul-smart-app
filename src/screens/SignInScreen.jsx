/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
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
  const [token, setToken] = useState();
  const [code, setCode] = useState();
  const [user, setUser] = useState();

  async function signInAsync() {
    // await AsyncStorage.setItem('userToken', 'abc'); // 실행시키면 실제로 저장되어서 바로 넘어가짐
    console.log('code isisis ', code);
    console.log('code isisis ', token);
    console.log('code isisis ', user);
    navigation.navigate('Main');
  }

  async function handleGetAccess() {
    const {
      data: { accessToken },
    } = await axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NV_APP_ID}&client_secret=${NV_APP_SECRET}&code=${code}&state=${STATE_STRING}`
    );

    console.log('accesstoken: ', accessToken);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log('config: ', config);
    setToken(accessToken);
    console.log('accesstoken success');

    const { data } = await axios.get('https://openapi.naver.com/v1/nid/me', config);
    console.log('data: ', data);
    setUser(data);
    console.log('user : ', user);

    console.log('apiResult : ', apiResult);
  }

  async function handlePressAsync() {
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl);
    console.log(encodeURIComponent(redirectUrl));

    const result = await AuthSession.startAsync({
      authUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NV_APP_ID}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&state=${STATE_STRING}`,
    });
    console.log('result', result);
    setCode(result.code);
    console.log('code: ', code);
    handleGetAccess();
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
