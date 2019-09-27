/* eslint-disable react/prop-types */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { useQuery } from '@apollo/react-hooks';
import { FIND_USER } from '../queries';
import UserInfo from '../components/UserInfo';
import ActivityLogs from '../components/ActivityLogs';
import Error from '../components/Error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default function MainScreen({ navigation }) {
  const id = navigation.getParam('id');

  const { loading, error, data } = useQuery(FIND_USER, {
    variables: { id },
  });
  if (loading)
    return (
      <LottieView
        source={require('./../assets/images/27-loading.json')}
        autoPlay
        loop
      />
    );
  if (error) return <Error />;

  const { name, achievement, activityLog } = data.findUser;

  return (
    <ScrollView>
      <View style={styles.container}>
        <UserInfo name={name} achievement={achievement} />
        <ActivityLogs
          activityLogs={activityLog}
          navigate={navigation.navigate}
        />
      </View>
    </ScrollView>
  );
}

MainScreen.navigationOptions = {
  title: '메인',
};
