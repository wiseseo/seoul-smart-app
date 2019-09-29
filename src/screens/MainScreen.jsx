/* eslint-disable react/prop-types */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { FIND_USER } from '../queries';
import UserInfo from '../components/UserInfo';
import ActivityLogs from '../components/ActivityLogs';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Logo from '../components/Logo';

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

  const { loading, error, data, refetch } = useQuery(FIND_USER, {
    variables: { id },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) return <Error />;

  const { name, achievement, activityLog } = data.findUser;

  return (
    <ScrollView>
      <View style={styles.container}>
        <UserInfo
          name={name}
          achievement={achievement}
          navigate={navigation.navigate}
        />
        <ActivityLogs
          id={id}
          loading={loading}
          refetch={refetch}
          activityLogs={activityLog}
          navigate={navigation.navigate}
        />
      </View>
    </ScrollView>
  );
}

MainScreen.navigationOptions = {
  headerTitle: <Logo />,
};
