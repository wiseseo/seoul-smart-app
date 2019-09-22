/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Achievement from './Achievement';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function UserInfo({ id, name, achievement, navigate }) {
  return (
    <View style={styles.container}>
      <Text>
{name}
님 ㅎㅇ
</Text>
      <Achievement achievement={achievement} />
      <TouchableOpacity onPress={() => navigate('Modify', { id })}>
        <Text>개인정보수정</Text>
      </TouchableOpacity>
    </View>
  );
}

UserInfo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  achievement: PropTypes.number.isRequired,
};
