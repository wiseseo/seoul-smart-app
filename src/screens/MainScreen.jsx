/* eslint-disable react/prop-types */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { FIND_USER } from '../queries';
import { MonoText } from '../components/StyledText';
import UserInfo from '../components/UserInfo';
import ActivityLogs from '../components/ActivityLogs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});

export default function MainScreen({ navigation }) {
  // const id = navigation.getParam('id');
  const id = '5d873382d4f25800173ce378';
  const { loading, error, data } = useQuery(FIND_USER, {
    variables: { id },
  });

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;

  const { name, achievement, activityLog } = data.findUser;

  const activityLogs = activityLog.map(activity => {
    return {
      id: activity.activityId,
      name: activity.name,
      isLeader: id === activity.leader.userId,
      type: activity.type,
      status: activity.status,
    };
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <MonoText>mono 폰트 적용한 메인페이지</MonoText>
        <UserInfo
          id={id}
          name={name}
          achievement={achievement}
          navigate={navigation.navigate}
        />
        <ActivityLogs
          activityLogs={activityLogs}
          navigate={navigation.navigate}
        />
      </View>
    </ScrollView>
  );
}

MainScreen.navigationOptions = {
  title: '메인',
};
