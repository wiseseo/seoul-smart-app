/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FilterList from '../components/FilterList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function FilterScreen({ navigation }) {
  const filter = {
    facility: [
      '오픈공간',
      '회의실',
      '세미나룸',
      '녹음실',
      '부엌',
      '스터디룸',
      '연습실',
      '극장',
    ],
    location: [
      '성북구',
      '도봉구',
      '양천구',
      '금천구',
      '서대문구',
      '강동구',
      '종로구',
      '동작구',
      '송파구',
      '성동구',
      '마포구',
      '중구',
      '은평구',
      '광진구',
      '용산구',
      '동대문구',
      '중랑구',
      '노원구',
      '강서구',
      '강남구',
      '강북구',
      '구로구',
      '영등포구',
      '관악구',
      '서초구',
    ],
  };
  return (
    <View style={styles.container}>
      <FilterList
        filter={filter[navigation.getParam('type')]}
        type={navigation.getParam('type')}
        navigate={navigation.navigate}
      />
    </View>
  );
}

FilterScreen.navigationOptions = {
  title: '필터',
};
