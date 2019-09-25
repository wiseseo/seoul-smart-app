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

export default function ActivityButton({ text, userId, activityId, refetch }) {
  const [comment, setComment] = useState();
  const [applyActivity] = useMutation(APPLY_ACTIVITY);
  return text === '신청' ? (
    <View style={styles.container}>
      <TextInput value={comment} onChangeText={value => setComment(value)} />
      <TouchableOpacity
        onPress={() => {
          if (comment) {
            applyActivity({ variables: { activityId, userId, comment } });
            refetch({ variables: { id: activityId } });
          }
        }}
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
