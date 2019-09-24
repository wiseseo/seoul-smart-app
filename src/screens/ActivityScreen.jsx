/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SeoulPrograms from '../components/SeoulPrograms';
import ActivityList from '../components/ActivityList';
import TypePicker from '../components/TypePicker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activityContainer: {
    flex: 1,
  },
});

export default function ActivityScreen({ navigation }) {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  const [isActivity, setIsActivity] = useState(true);
  const [type, setType] = useState('');
  return (
    <View style={styles.container}>
      <Text>활동페이지</Text>
      <TouchableOpacity
        onPress={() => {
          setIsActivity(true);
        }}
      >
        <Text>개인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsActivity(false);
        }}
      >
        <Text>서울시</Text>
      </TouchableOpacity>
      {isActivity ? (
        <View style={styles.activityContainer}>
          <TypePicker type={type} setType={setType} />
          <ActivityList typeFilter={type} navigate={navigation.navigate} />
        </View>
      ) : (
        <SeoulPrograms />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('Edit', { id: 'new' })}
      >
        <Text>개설하기</Text>
      </TouchableOpacity>
    </View>
  );
}

ActivityScreen.navigationOptions = {
  title: '활동',
};
