import React from 'react';
import { View, Picker, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { width, height, font } from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    width: width / 1.2,
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e2e2e3',
    marginVertical: 10,
    paddingLeft: 5,
  },
  picker: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e2e2e3',
    borderRadius: 100,
  },
  pickerItem: {
    width: width / 1.2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e2e2e3',
  },
});

export default function TypePicker({ type, setType }) {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={type}
        onValueChange={value => setType(value)}
      >
        <Picker.Item value="mentoring" label="멘토링" />
        <Picker.Item value="study" label="스터디" />
        <Picker.Item value="conference" label="컨퍼런스" />
        <Picker.Item value="networking" label="네트워킹" />
        <Picker.Item value="lifestyle" label="라이프스타일" />
      </Picker>
    </View>
  );
}

TypePicker.propTypes = {
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
};
