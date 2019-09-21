/* eslint-disable react/prop-types */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

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
  /* const {  } = ; */
  console.log(navigation);
  const fromActivityOpen = navigation.getParam('fromActivityOpen', false);
  const AOkey = navigation.getParam('AOkey', '');
  // console.log(AOkey);
  // console.log(fromActivityOpen);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>장소페이지</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Text>필터</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Detail', {
              fromActivityOpen,
              AOkey,
            })}
        >
          <Text>상세보기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

PlaceScreen.navigationOptions = {
  title: '장소',
};
