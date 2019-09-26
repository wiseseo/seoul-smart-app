import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { font, normalize } from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(font),
    paddingVertical: normalize(font / 2),
    borderColor: '#e2e2e3',
    borderWidth: 1,
    borderRadius: normalize(font * 1.4),
  },
  input: {
    marginRight: 'auto',
    marginLeft: normalize(font),
  },
  button: {
    height: normalize(font * 1.4),
  },
  icon: {
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },
});

export default function Search({ setSearch }) {
  const [text, setText] = useState();
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={value => setText(value)}
        placeholder="검색어를 입력해주세요"
        style={styles.input}
      />
      <TouchableOpacity onPress={() => setSearch(text)} style={styles.button}>
        <Image
          source={require('./../../assets/images/Search.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

Search.propTypes = {
  setSearch: PropTypes.func.isRequired,
};
