import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(100,100,200)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ActivityButton({ text }) {
  console.log(text);
  return text === '신청' ? (
    <View style={styles.container}>
      <TextInput />
      <TouchableOpacity>
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

ActivityButton.propTypes = {
  text: PropTypes.string.isRequired,
};
