/* eslint-disable react/prop-types */
import React from 'react';
import { AsyncStorage, StyleSheet, View, Button, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function SignInScreen({ navigation }) {
  async function signInAsync() {
    // await AsyncStorage.setItem('userToken', 'abc'); // 실행시키면 실제로 저장되어서 바로 넘어가짐
    navigation.navigate('Main');
  }

  return (
    <View style={styles.container}>
      <Text>로그인화면</Text>
      <Button title="Sign in!" onPress={signInAsync} />
    </View>
  );
}
