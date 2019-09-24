import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
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

export default function ActivityButton({ status, participants, leader }) {
  const [user, setUser] = useState('');
  AsyncStorage.getItem('userId').then(value => {
    setUser(value);
  });
  const isLeader = leader === user;
  const isRecruit = status === 'recruit';
  const isUser = participants.some(id => id === user);

  if (!isLeader) {
    if (isRecruit) {
      if (isUser) {
        return (
          <View style={styles.container}>
            <TouchableOpacity>
              <Text>신청완료</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return (
        <View style={styles.container}>
          <TextInput />
          <TouchableOpacity>
            <Text>신청</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>모집마감</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>활동상태 변경</Text>
      </TouchableOpacity>
    </View>
  );
}

ActivityButton.propTypes = {
  status: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  leader: PropTypes.string.isRequired,
};
