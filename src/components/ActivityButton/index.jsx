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
import { WRITE_EDIT } from '../Form/queries';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(100,100,200)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ActivityButton({
  text,
  userId,
  activityId,
  refetch,
  name,
  type,
  place,
  date,
  startTime,
  endTime,
  total,
  content,
  room,
  navigate,
}) {
  const [comment, setComment] = useState();
  const [applyActivity] = useMutation(APPLY_ACTIVITY);
  const [writeEdit] = useMutation(WRITE_EDIT);

  if (text === '신청') {
    return (
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
    );
  }
  if (text === '활동 상태 변경') {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            writeEdit({
              variables: {
                id: activityId,
                name,
                total,
                date,
                startTime,
                endTime,
                place,
                room,
                content,
                type,
              },
            });
            navigate('Edit', { id: activityId });
          }}
        >
          <Text>편집</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

ActivityButton.propTypes = {
  text: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};
