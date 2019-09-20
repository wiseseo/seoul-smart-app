/* eslint-disable react/prop-types */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

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
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <MonoText>mono 폰트 적용한 메인페이지</MonoText>
          <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
            <Text>개인정보 수정</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Participants')}>
            <Text>신청자보기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Modify')}>
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
