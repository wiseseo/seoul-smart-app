/* eslint-disable react/prop-types */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default function ActivityOpenScreen({ navigation }) {
  const { id } = navigation.state.params;
  const title = id === 'aaa' ? '활동 수정 페이지' : '활동 개설 페이지';

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>{title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'PlaceStack',
              {},
              NavigationActions.navigate({
                routeName: 'Place',
                params: { selectable: true },
              })
            )}
        >
          <Text>장소선택</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

ActivityOpenScreen.navigationOptions = {
  title: '활동 개설 페이지',
};
