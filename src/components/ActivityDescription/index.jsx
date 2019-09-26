/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CHANGE_ACTIVITY } from './query';
import { CANCEL_ACTIVITY, DELETE_ACTIVITY } from '../../queries';
import { WRITE_EDIT } from '../Form/queries';
import {
  NanumGothicBold,
  NanumGothic,
  NanumGothicExtraBold,
} from '../StyledText';
import { font, normalize } from '../../constants/Layout';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(font * 0.5),
    // alignSelf: 'stretch',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#e2e2e3',
    borderStyle: 'solid',
    borderBottomWidth: 1.4,
    paddingVertical: normalize(font * 1.2),
    paddingHorizontal: normalize(font * 0.6),
  },
  titletype: {
    flexDirection: 'column',
  },
  buttons: {
    flexDirection: 'column',
  },
  title: {
    fontSize: normalize(font * 1.2),
    marginVertical: normalize(font * 0.5),
  },
  statusBar: {
    marginVertical: normalize(font * 0.5),
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: normalize(font * 1.2),
    paddingHorizontal: normalize(font * 0.6),
    borderBottomColor: '#e2e2e3',
    borderStyle: 'solid',
    borderBottomWidth: 1.4,
  },
  info: {
    color: Colors.mainColor,
    marginVertical: normalize(font * 0.5),
  },
  contentContainer: {
    justifyContent: 'space-around',
    paddingHorizontal: normalize(font * 0.6),
  },
  contents: {
    marginVertical: normalize(font * 1.2),
  },
});

const state = ['recruit', 'pauserecruit', 'ongoing', 'done'];
const kor = ['모집 중', '모집 마감', '진행 중', '진행 마감'];

export default function ActivityDescription({
  id,
  userId,
  name,
  type,
  place,
  date,
  startTime,
  endTime,
  room,
  total,
  content,
  status,
  participants,
  text,
  refetch,
  navigate,
}) {
  const days = `${date} ${startTime}~${endTime}`;
  const number = `${participants.length}/${total}명`;
  const [changeActivity] = useMutation(CHANGE_ACTIVITY);
  const [writeEdit] = useMutation(WRITE_EDIT);
  const [cancelActivity] = useMutation(CANCEL_ACTIVITY);
  const [deleteActivity] = useMutation(DELETE_ACTIVITY);

  function AsyncAlert() {
    return new Promise(resolve => {
      Alert.alert(
        '정말 취소하시겠습니까?',
        '',
        [
          {
            text: '아니오',
            onPress: () => {
              resolve(false);
            },
            style: 'cancel',
          },
          {
            text: '네',
            onPress: () => {
              resolve(true);
            },
          },
        ],
        { cancelable: true }
      );
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titletype}>
          <NanumGothicBold style={styles.title}>{name}</NanumGothicBold>
          <NanumGothicBold>{type}</NanumGothicBold>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={async () => {
              function AsyncAlert() {
                return new Promise(resolve => {
                  Alert.alert(
                    `활동상태가 ${
                      kor[state.indexOf(status) + 1]
                    }로 변경됩니다.`,
                    '',
                    [
                      {
                        text: '취소',
                        onPress: () => {
                          resolve(false);
                        },
                        style: 'cancel',
                      },
                      {
                        text: '확인',
                        onPress: () => {
                          resolve(true);
                        },
                      },
                    ],
                    { cancelable: true }
                  );
                });
              }
              if (state.indexOf(status) < 3) {
                const accept = await AsyncAlert();
                if (accept) {
                  changeActivity({
                    variables: {
                      activityId: id,
                      status: state[state.indexOf(status) + 1],
                    },
                  });
                  refetch({ variables: id });
                }
              }
            }}
          >
            <NanumGothicBold style={styles.statusBar}>
              {kor[state.indexOf(status)]}
            </NanumGothicBold>
          </TouchableOpacity>
          {(text === '활동 상태 변경' && (
            <View>
              <TouchableOpacity
                onPress={async () => {
                  writeEdit({
                    variables: {
                      id,
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
                  navigate('Edit', { id, isExtend: true });
                }}
              >
                <NanumGothicExtraBold>연장하기</NanumGothicExtraBold>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const cancel = await AsyncAlert();
                  if (cancel) {
                    deleteActivity({ variables: { activityId: id } });
                    navigate('Activity');
                  }
                }}
              >
                <NanumGothicExtraBold>개설취소</NanumGothicExtraBold>
              </TouchableOpacity>
            </View>
          )) ||
            (text === '신청 완료' && (
              <TouchableOpacity
                onPress={async () => {
                  const cancel = await AsyncAlert();
                  if (cancel) {
                    cancelActivity({
                      variables: { activityId: id, userId },
                    });
                    refetch({ variables: { id } });
                  }
                }}
              >
                <NanumGothicExtraBold>신청취소</NanumGothicExtraBold>
              </TouchableOpacity>
            ))}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <NanumGothic style={styles.info}>{days}</NanumGothic>
        <NanumGothic style={styles.info}>{place}</NanumGothic>
        <NanumGothic style={styles.info}>{room}</NanumGothic>
        <TouchableOpacity
          onPress={() => navigate('Participants', { participants })}
        >
          <NanumGothic style={styles.info}>{number}</NanumGothic>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <NanumGothic style={styles.contents}>{content}</NanumGothic>
      </View>
    </View>
  );
}

ActivityDescription.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
};
