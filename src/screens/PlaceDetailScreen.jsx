/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function PlaceDetailScreen({ navigation }) {
  const selectable = navigation.getParam('selectable', false);
  const id = navigation.getParam('id');
  console.log(id);

  return (
    <View style={styles.container}>
      <Text>장소 상세 화면</Text>
      {selectable && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'ActivityStack',
              {},
              NavigationActions.navigate('Open')
            )
          }>
          <Text>확인</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

PlaceDetailScreen.navigationOptions = {
  title: '장소 상세 보기',
};
