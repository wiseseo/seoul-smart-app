import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function AuthLoadingScreen(props) {
  // Fetch the token from storage then navigate to our appropriate place
  async function bootstrapAsync() {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // eslint-disable-next-line react/prop-types
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  useEffect(() => {
    bootstrapAsync();
  }, []);

  // Render any loading content that you like here
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
      <Text>로딩중...</Text>
    </View>
  );
}
