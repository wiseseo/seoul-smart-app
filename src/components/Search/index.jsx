import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Search({ setSearch }) {
  const [text, setText] = useState();
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={value => setText(value)}
        placeholder="검색어를 입력해주세요"
      />
      <TouchableOpacity onPress={() => setSearch(text)}>
        <Text>검색</Text>
      </TouchableOpacity>
    </View>
  );
}

Search.propTypes = {
  setSearch: PropTypes.func.isRequired,
};
