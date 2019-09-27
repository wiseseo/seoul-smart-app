/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SeoulPrograms from '../components/SeoulPrograms';
import ActivityList from '../components/ActivityList';
import TypePicker from '../components/TypePicker';
import { font, normalize } from '../constants/Layout';
import { NanumGothicBold } from '../components/StyledText';
import Logo from '../components/Logo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activityContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  programType: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  programTypeButtons: {
    paddingVertical: normalize(font * 1.4),
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
  },
  isPressed: {
    borderBottomColor: 'black',
  },
  isNotPressed: {
    borderBottomColor: '#e2e2e3',
  },
  activityAddButton: {
    width: normalize(60),
    height: normalize(60),
    resizeMode: 'contain',
  },
  addButtonContainer: {
    position: 'absolute',
    right: normalize(font),
    bottom: normalize(font),
  },
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
          <TypePicker type={type} setType={setType} />
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
  headerTitle: <Logo />,
};
