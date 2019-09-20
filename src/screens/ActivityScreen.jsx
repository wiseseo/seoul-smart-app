/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default function ActivityScreen({ navigation }) {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return (
    <View style={styles.container}>
      <Text>활동페이지</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Open')}>
        <Text>개설하기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
        <Text>상세보기</Text>
      </TouchableOpacity>
    </View>
  );
}

ActivityScreen.navigationOptions = {
  title: '활동',
};
