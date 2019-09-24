/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function AuthLoadingScreen({ navigation }) {
  // Fetch the token from storage then navigate to our appropriate place
  async function bootstrapAsync() {
    // const userToken = await AsyncStorage.getItem('userToken'); // 실행시키면 실제로 값을 받아와서 Auth 화면을 건너뜀
    const userToken = false;
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // eslint-disable-next-line react/prop-types

    AsyncStorage.setItem('userId', '5d873382d4f25800173ce378');
    navigation.navigate(userToken ? 'Main' : 'Auth');
  }

  useEffect(() => {
    bootstrapAsync();
  }, []);

  // Render any loading content that you like here
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
      <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
        <Text>로딩끝</Text>
      </TouchableOpacity>
      <Text>로딩화면</Text>
    </View>
  );
}
