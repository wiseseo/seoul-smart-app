/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { AuthSession } from 'expo';
import axios from 'axios';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../queries';
import { NanumGothic, NanumGothicBold, NanumGothicExtraBold } from '../components/StyledText.js';

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

function getAuthUrl(url, clientId, redirectUri) {
  return `${url}/authorize?response_type=code&state=sndkgjdkfmvsiw21j&client_id=${clientId}&redirect_uri=${redirectUri}`;
}

function getAccessUrl(url, clientId, clientSecret, code, social) {
  const REDIRECT_URI = AuthSession.getRedirectUrl();
  const addition =
    social === 'kakao'
      ? `redirect_uri=${REDIRECT_URI}`
      : `state=sndkgjdkfmvsiw21j`;
  return `${url}/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&${addition}`;
}

const styles = StyleSheet.create({  // style을 한 곳에 모아 관리하기 위함. 여러 스타일 배열로 묶어 적용도 가능
  container: {
    flex: 1,  // flex는 크기를 비율로 설정하는 것. (부모 view 크기의 특정 비율만큼 차지. 객체 사이의 비율)
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  element: {  // 네이버&카카오톡 로그인 버튼 2개에 쓸 것
    width: '100%',  // 흠..?ㅠㅠ
    marginVertical: '1.6%',
    paddingHorizontal: '8.3%',
    resizeMode: 'contain',
    // paddingLeft + paddingRight = paddingHorizontal
  },
  logo: {  // 로고와 로그인 버튼들 사이 간격을 벌리기. (버튼간의 관계 기준!) 
    marginVertical: '4.7%',  // 화면이 세로가 길어질 수 있으므로, 상단을 기준으로 padding 아님.
  },
});

export default function SignInScreen({ navigation }) {
  const [createUser, { data }] = useMutation(CREATE_USER);

  async function navigateMain() {
    const id = await AsyncStorage.getItem('userId');
    navigation.navigate(
      'MainStack',
      {},
      NavigationActions.navigate({ routeName: 'Main', params: { id } })
    );
  }

  useEffect(() => {
    if (data) {
      AsyncStorage.setItem('userId', data.createUser.id);
      navigateMain();
    }
  }, [data]);

  async function signInAsync(token, user) {
    const name = user.response
      ? user.response.nickname
      : user.properties.nickname;

    createUser({ variables: { name, token } });
    AsyncStorage.setItem('userToken', token);
    AsyncStorage.setItem('userName', name);
  }

  async function handleGetUser(accessToken, social) {
    const { openApi } = Auth[social];
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    // GET resource-owner's nickname, access_token(header에 넣어 전송)
    const result = await axios.get(openApi, config);

    signInAsync(accessToken, result.data);
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
    const REDIRECT_URI = AuthSession.getRedirectUrl();
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
      <View style={styles.logo}>
        <Image source={require('./logo.png')} />
      </View>
      <View style={styles.element}>
        <TouchableOpacity onPress={() => handlePressAsync('naver')}>
          <Image source={require('./naver.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.element}>
        <TouchableOpacity onPress={() => handlePressAsync('kakao')}>
          <Image source={require('./kakao.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
