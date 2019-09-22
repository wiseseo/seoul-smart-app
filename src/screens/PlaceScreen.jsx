/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
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
  const [facility, setFacility] = useState();
  const [gu, setGu] = useState();
  const [selectable, setSelectable] = useState();

  useEffect(() => {
    setFacility(navigation.getParam('facility'));
    setGu(navigation.getParam('location'));
    setSelectable(navigation.getParam('selectable'));
    return () => {
      setSelectable(false);
    };
  }, [navigation.state.params]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>장소페이지</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', { selectable })}
        >
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
        <PlaceList
          search={search}
          facility={facility}
          gu={gu}
          navigate={navigation.navigate}
        />
      </View>
    </ScrollView>
  );
}

PlaceScreen.navigationOptions = {
  title: '장소',
};
