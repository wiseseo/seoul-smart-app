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
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>장소페이지</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Text>필터</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

PlaceScreen.navigationOptions = {
  title: '장소',
};
