/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import TypePicker from '../TypePicker';
import { useBack } from '../../lib';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Form({ navigate }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  useBack(() => {
    console.log('뒤로가기 버튼');

    return true;
  });
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={value => setName(value)}
        value={name}
        placeholder="활동 이름"
      />
      <TypePicker type={type} setType={setType} />
      <TouchableOpacity
        onPress={() =>
          navigate(
            'PlaceStack',
            {},
            NavigationActions.navigate({
              routeName: 'Place',
              params: { selectable: true },
            })
          )
        }>
        <Text>장소선택</Text>
      </TouchableOpacity>
    </View>
  );
}

Form.propTypes = {};
