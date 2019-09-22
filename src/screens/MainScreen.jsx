/* eslint-disable react/prop-types */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { useQuery } from '@apollo/react-hooks';
import { FIND_USER } from '../queries';
import { MonoText } from '../components/StyledText';
import Achievement from '../components/Achievement';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <MonoText>mono 폰트 적용한 메인페이지</MonoText>
          <Achievement achievement={achievement} />
          <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
            <Text>개인정보 수정</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Participants')}>
            <Text>신청자보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'ActivityStack',
                {},
                NavigationActions.navigate({
                  routeName: 'Open',
                  params: { id: 'aaa' },
                })
              )}
          >
            <Text>수정하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

MainScreen.navigationOptions = {
  title: '메인',
};
