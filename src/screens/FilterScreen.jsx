/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function FilterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>{navigation.getParam('type')}</Text>
    </View>
  );
}

FilterScreen.navigationOptions = {
  title: '필터',
};
