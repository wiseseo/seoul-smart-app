/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Loading from '../components/Loading';

export default function AuthLoadingScreen({ navigation }) {
  // Fetch the token from storage then navigate to our appropriate place
  async function bootstrapAsync() {
    const id = await AsyncStorage.getItem('userId');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    if (id) {
      navigation.navigate(
        'MainStack',
        {},
        NavigationActions.navigate({ routeName: 'Main', params: { id } })
      );
    } else {
      navigation.navigate('Auth');
    }
  }

  useEffect(() => {
    bootstrapAsync();
  }, []);

  // Render any loading content that you like here
  return <Loading />;
}
