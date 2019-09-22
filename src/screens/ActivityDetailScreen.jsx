import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ActivityDetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>활동 상세 보기 페이지</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Edit', { id: 'aaa' })}
      >
        <Text>편집(개설자)</Text>
      </TouchableOpacity>
    </View>
  );
}

ActivityDetailScreen.navigationOptions = {
  title: '활동 상세 보기',
};
