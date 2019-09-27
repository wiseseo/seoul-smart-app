/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { APPLY_ACTIVITY } from './query';
import { WRITE_EDIT } from '../Form/queries';
import { NanumGothicExtraBold } from '../StyledText';
import { font, normalize } from '../../constants/Layout';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingVertical: normalize(font * 1.4),
  },
  editContainer: {
    backgroundColor: 'black',
  },
  applyContainer: {
    backgroundColor: Colors.mainColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyCheckContainer: {
    backgroundColor: Colors.mainColor,
  },
  pauseRecruitContainer: {
    backgroundColor: '#bd1138',
  },
  input: {
    width: normalize(font * 20),
    marginLeft: normalize(font * 2),
    paddingHorizontal: normalize(font * 0.8),
    paddingVertical: normalize(font * 0.6),
  },
  applyButton: {
    marginRight: normalize(font * 2),
    marginLeft: normalize(font * 1.5),
  },
  buttonText: {
    color: 'white',
    fontSize: normalize(font * 1.3),
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
      <View style={[styles.container, styles.applyContainer]}>
        <TextInput
          value={comment}
          onChangeText={value => setComment(value)}
          style={[styles.input, { backgroundColor: '#ffffff' }]}
          placeholder="신청 내용을 남겨주세요"
        />
        <TouchableOpacity
          onPress={() => {
            if (comment) {
              applyActivity({ variables: { activityId, userId, comment } });
              refetch({ variables: { id: activityId } });
            }
          }}
          style={styles.applyButton}
        >
          <NanumGothicExtraBold style={styles.buttonText}>
            {text}
          </NanumGothicExtraBold>
        </TouchableOpacity>
      </View>
    );
  }
  if (text === '활동 상태 변경') {
    return (
      <View style={[styles.container, styles.editContainer]}>
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
            navigate('Edit', { id: activityId, refetch });
          }}
        >
          <NanumGothicExtraBold style={styles.buttonText}>
            편집하기
          </NanumGothicExtraBold>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        text === '신청 완료'
          ? styles.applyCheckContainer
          : styles.pauseRecruitContainer,
      ]}
    >
      <NanumGothicExtraBold style={styles.buttonText}>
        {text}
      </NanumGothicExtraBold>
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
