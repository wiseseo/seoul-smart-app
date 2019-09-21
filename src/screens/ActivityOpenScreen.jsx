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

export default function ActivityOpenScreen({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>활동개설페이지</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Place', {
              header: null,
              fromActivityOpen: true,
            })}
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
