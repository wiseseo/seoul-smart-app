/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Search from '../components/Search';
import PlaceList from '../components/PlaceList';
import { NanumGothic, NanumGothicBold } from '../components/StyledText';
import { font, normalize } from '../constants/Layout';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  filter: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    margin: normalize(font),
  },
  button: {
    backgroundColor: '#e2e2e3',
    paddingVertical: normalize(font * 0.7),
    paddingHorizontal: normalize(font * 0.9),
    borderRadius: normalize(font),
    flexDirection: 'row',
    marginRight: normalize(font),
  },
  text: {
    fontSize: normalize(font),
    color: '#707070',
    marginRight: normalize(font * 0.2),
  },
  selected: {
    fontSize: normalize(font),
    color: Colors.mainColor,
    marginHorizontal: normalize(font * 0.6),
  },
});

export default function PlaceScreen({ navigation }) {
  const [search, setSearch] = useState();
  const [facility, setFacility] = useState();
  const [gu, setGu] = useState();

  useEffect(() => {
    setFacility(navigation.getParam('facility'));
    setGu(navigation.getParam('location'));
  }, [navigation.state.params]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Search setSearch={setSearch} />
        <View style={styles.filter}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Filter', { type: 'facility' })}
            style={styles.button}
          >
            <NanumGothic style={styles.text}>시설</NanumGothic>
            <NanumGothicBold style={styles.selected}>
              {facility || '...'}
            </NanumGothicBold>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Filter', { type: 'location' })}
            style={styles.button}
          >
            <NanumGothic style={styles.text}>위치</NanumGothic>
            <NanumGothicBold style={styles.selected}>
              {gu || '...'}
            </NanumGothicBold>
          </TouchableOpacity>
        </View>
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
