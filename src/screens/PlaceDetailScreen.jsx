import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function PlaceDetailScreen(props) {
  // console.log(navigation);
  // console.log(props);
  const { navigation } = props;
  console.log(navigation);
  const fromActivityOpen = navigation.getParam('fromActivityOpen', false);
  const AOkey = navigation.getParam('AOkey', '');
  // console.log(fromActivityOpen);
  console.log(AOkey);
  if (fromActivityOpen) {
    return (
      <View style={styles.container}>
        <Text>장소 상세 화면</Text>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Text>확인</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>장소 상세 화면</Text>
    </View>
  );
}

PlaceDetailScreen.navigationOptions = {
  title: '장소 상세 보기',
};
