/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SeoulPrograms from '../components/SeoulPrograms';
import ActivityList from '../components/ActivityList';
import TypePicker from '../components/TypePicker';
import { width, height, font } from '../constants/Layout';
import { NanumGothicBold } from '../components/StyledText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activityContainer: {
    flex: 12,
  },
  programType: {
    flex: 1,
    flexDirection: 'row',
    width,
  },
  programTypeButtons: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  isPressed: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'black',
    width: width / 2,
  },
  isNotPressed: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#e2e2e3',
    width: width / 2,
  },
  activityAddButton: {
    borderWidth: 1,
    resizeMode: 'cover',
    width: 70,
    height: 70,
  },
  addButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  typePicker: {},
  activityList: {},
});

export default function ActivityScreen({ navigation }) {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  const activityAdd = require('../assets/images/AddActivity.png');
  const [isActivity, setIsActivity] = useState(true);
  const [type, setType] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.programType}>
        <TouchableOpacity
          onPress={() => {
            setIsActivity(true);
          }}
          style={[
            styles.programTypeButtons,
            isActivity ? styles.isPressed : styles.isNotPressed,
          ]}
        >
          <NanumGothicBold>개인</NanumGothicBold>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsActivity(false);
          }}
          style={[
            styles.programTypeButtons,
            !isActivity ? styles.isPressed : styles.isNotPressed,
          ]}
        >
          <NanumGothicBold>서울시</NanumGothicBold>
        </TouchableOpacity>
      </View>
      {isActivity ? (
        <View style={styles.activityContainer}>
          <TypePicker type={type} setType={setType} style={styles.typePicker} />
          <ActivityList
            typeFilter={type}
            navigate={navigation.navigate}
            style={styles.activityList}
          />
        </View>
      ) : (
        <View style={styles.activityContainer}>
          <SeoulPrograms />
        </View>
      )}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Edit', { id: 'new' })}
        >
          <Image source={activityAdd} style={styles.activityAddButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

ActivityScreen.navigationOptions = {
  title: '활동',
};
