import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Search() {
  return (
    <View style={styles.container}>
      <TextInput placeholder="검색어를 입력해주세요" />
      <TouchableOpacity>
        <Text>검색</Text>
      </TouchableOpacity>
    </View>
  );
}
