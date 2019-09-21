/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Search from '../components/Search';
import PlaceList from '../components/PlaceList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default function PlaceScreen({ navigation }) {
  const [search, setSearch] = useState();
  console.log(navigation.getParam('facility'));
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>장소페이지</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
          <Text>상세보기</Text>
        </TouchableOpacity>
        <Search setSearch={setSearch} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Filter', { type: 'facility' })}
        >
          <Text>시설 필터</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Filter', { type: 'location' })}
        >
          <Text>장소 필터</Text>
        </TouchableOpacity>
        <PlaceList search={search} />
      </View>
    </ScrollView>
  );
}

PlaceScreen.navigationOptions = {
  title: '장소',
};
