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

export default function ModifyUserScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <MonoText>mono 폰트 적용한 사용자정보수정</MonoText>
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Text>저장</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

ModifyUserScreen.navigationOptions = {
  title: '사용자 정보수정',
};
