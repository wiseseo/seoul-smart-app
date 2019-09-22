/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { AuthSession } from 'expo';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NV_APP_ID = 'UJxRowek7VWI2fNRWzhf';
const NV_APP_SECRET = 'CedceOMq48';
const STATE_STRING = 'sfdjlweioj312esdf';

const KK_APP_ID = 'b46cd5f7008567fe15d23d72d4e34040';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export function App() {
  const [token, setToken] = useState();
  const [code, setCode] = useState();
  const [user, setUser] = useState();
}

async function handleGetAccess() {
  const {
    data: { ACCESSTOKEN },
  } = await axios.get(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NV_APP_ID}
  &client_secret=${NV_APP_SECRET}
  &code=${code}&state=${STATE_STRING}`);

  const config = {
    headers: {
      Authorization: `Bearer ${ACCESSTOKEN}`,
    },
  };

  setToken(ACCESSTOKEN);

  const { data } = await axios.get(
    'https://openapi.naver.com/v1/nid/me',
    config
  );
  console.log(data);
  setUser(data);
}

async function handlePressAsync() {
  const redirectUrl = AuthSession.getRedirectUrl();
  console.log(encodeURIComponent(redirectUrl));

  const result = await AuthSession.startAsync({
    authUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NV_APP_ID}&redirect_uri=${encodeURIComponent(
      redirectUrl
    )}&state=${STATE_STRING}`,
  });

  console.log('result : ', result);

  setCode(result.code);

  handleGetAccess();
}

export default function SignInScreen({ navigation }) {
  async function signInAsync() {
    // await AsyncStorage.setItem('userToken', 'abc'); // 실행시키면 실제로 저장되어서 바로 넘어가짐
    navigation.navigate('Main');
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
