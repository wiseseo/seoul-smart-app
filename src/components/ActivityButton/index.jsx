import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { APPLY_ACTIVITY } from './query';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(100,100,200)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ActivityButton({ text, userId, activityId }) {
  const [applyActivity] = useMutation(APPLY_ACTIVITY);
  const [comment, setComment] = useState();
  return text === '신청' ? (
    <View style={styles.container}>
      <TextInput value={comment} onChangeText={value => setComment(value)} />
      <TouchableOpacity
        onPress={() =>
          applyActivity({ variables: { activityId, userId, comment } })}
      >
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
  userId: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
};
