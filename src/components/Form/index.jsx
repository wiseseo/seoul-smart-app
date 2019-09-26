/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { useMutation } from '@apollo/react-hooks';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';
import TypePicker from '../TypePicker';
import { useBack } from '../../lib';
import {
  START_EDIT,
  END_EDIT,
  WRITE_EDIT,
  CREATE_ACTIVITY,
  EXTEND_ACTIVITY,
  MODIFY_ACTIVITY,
} from './queries';
import { NanumGothicBold, NanumGothicExtraBold } from '../StyledText';
import { width, font, normalize } from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    margin: normalize(font * 2),
  },
  box: {
    borderColor: '#e2e2e3',
    borderWidth: 1,
    marginBottom: normalize(font),
    alignSelf: 'stretch',
    paddingVertical: normalize(font * 0.8),
    paddingHorizontal: normalize(font),
  },
  input: {
    fontFamily: 'nanum-gothic',
    color: '#707070',
    alignSelf: 'stretch',
    fontSize: normalize(font * 1.2),
  },
  select: {
    backgroundColor: '#e2e2e3',
  },
  date: {
    width: width - normalize(font * 2) * 2 - 1,
  },
  time: {
    width: width / 2 - normalize(font * 2.5) - 1,
  },
  button: {
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: normalize(font * 1.4),
  },
  buttonText: {
    fontSize: normalize(font * 1.3),
    color: 'white',
  },
});

export default function Form({
  userId,
  navigation,
  id,
  selectedPlace,
  selectedRoom,
  isExtend,
}) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [total, setTotal] = useState('');
  const [content, setContent] = useState('');
  const [place, setPlace] = useState('');
  const [room, setRoom] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [startEdit, { data }] = useMutation(START_EDIT);
  const [writeEdit] = useMutation(WRITE_EDIT);
  const [endEdit] = useMutation(END_EDIT);
  const [createActivity] = useMutation(CREATE_ACTIVITY);
  const [extendActivity] = useMutation(EXTEND_ACTIVITY);
  const [modifyActivity] = useMutation(MODIFY_ACTIVITY);

  useEffect(() => {
    startEdit();
    setPlace(selectedPlace);
    setRoom(selectedRoom);
  }, []);

  useEffect(() => {
    if (data) {
      setName(data.startEdit.name);
      setType(data.startEdit.type);
      setDate(data.startEdit.date);
      setStartTime(data.startEdit.startTime);
      setEndTime(data.startEdit.endTime);
      setTotal(data.startEdit.total.toString());
      setContent(data.startEdit.content);
      if (!selectedPlace) {
        setPlace(data.startEdit.place);
        setRoom(data.startEdit.room);
      }
    }
  }, [data]);

  useEffect(() => {
    if (isExtend) {
      setDisabled(
        [date, startTime, endTime, place, room].every(value => !!value)
      );
    } else {
      setDisabled(
        [
          name,
          type,
          date,
          startTime,
          endTime,
          total,
          content,
          place,
          room,
        ].every(value => !!value)
      );
    }
  }, [name, type, date, startTime, endTime, total, content, place, room]);

  useBack(async () => {
    endEdit();
    function AsyncAlert() {
      return new Promise(resolve => {
        Alert.alert(
          '작성하신 내용이 사라집니다.',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => {
                resolve(false);
              },
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                resolve(true);
              },
            },
          ],
          { cancelable: true }
        );
      });
    }
    const back = await AsyncAlert();
    if (back) navigation.goBack();
    return false;
  });

  const current = new Date()
    .toISOString()
    .split('T')
    .shift();

  return (
    <>
      <View style={styles.container}>
        {isExtend ? (
          <>
            <NanumGothicBold>{name}</NanumGothicBold>
            <NanumGothicBold>{type}</NanumGothicBold>
          </>
        ) : (
          <>
            <TextInput
              style={[styles.input, styles.box]}
              onChangeText={value => setName(value)}
              value={name}
              placeholder="활동 이름"
            />
            <TypePicker
              style={[styles.box]}
              type={type}
              setType={setType}
              isForm
            />
          </>
        )}
        <TouchableOpacity
          style={[
            styles.box,
            styles.select,
            {
              marginTop: normalize(font),
              paddingVertical: normalize(font * 1.2),
            },
          ]}
          onPress={() => {
            writeEdit({
              variables: {
                id,
                name,
                type,
                date,
                startTime,
                endTime,
                total,
                content,
                place,
                room,
              },
            });
            navigation.navigate(
              'PlaceStack',
              {},
              NavigationActions.navigate({
                routeName: 'Place',
              })
            );
          }}
        >
          {place ? (
            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
              <NanumGothicBold style={{ fontSize: normalize(font * 1.2) }}>
                {place}
              </NanumGothicBold>
              <NanumGothicBold style={{ fontSize: normalize(font * 1.2) }}>
                {room}
              </NanumGothicBold>
            </View>
          ) : (
            <NanumGothicBold style={{ fontSize: normalize(font * 1.2) }}>
              장소 선택
            </NanumGothicBold>
          )}
        </TouchableOpacity>
        <DatePicker
          style={[styles.box, styles.select, styles.date]}
          date={date}
          mode="date"
          placeholder="날짜 선택"
          format="YYYY-MM-DD"
          minDate={current}
          maxDate="2021-12-01"
          confirmBtnText="확인"
          cancelBtnText="취소"
          customStyles={{
            dateIcon: {
              display: 'none',
            },
            dateInput: {
              alignItems: 'flex-start',
              borderColor: 'transparent',
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={value => {
            setDate(value);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
          }}
        >
          <DatePicker
            style={[styles.box, styles.select, styles.time]}
            date={startTime}
            mode="time"
            placeholder="시간 선택"
            format="HH:mm"
            confirmBtnText="확인"
            cancelBtnText="취소"
            customStyles={{
              dateIcon: {
                display: 'none',
              },
              dateInput: {
                alignItems: 'flex-start',
                borderColor: 'transparent',
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={value => {
              setStartTime(value);
            }}
          />
          <DatePicker
            style={[styles.box, styles.select, styles.time]}
            date={endTime}
            mode="time"
            placeholder="시간 선택"
            format="HH:mm"
            confirmBtnText="확인"
            cancelBtnText="취소"
            customStyles={{
              dateIcon: {
                display: 'none',
              },
              dateInput: {
                alignItems: 'flex-start',
                borderColor: 'transparent',
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={value => {
              setEndTime(value);
            }}
          />
        </View>
        {isExtend ? (
          <>
            <Text>{total}</Text>
            <Text>{content}</Text>
          </>
        ) : (
          <>
            <TextInput
              style={[styles.input, styles.box]}
              onChangeText={value => {
                setTotal(value);
              }}
              value={total}
              keyboardType="numeric"
              placeholder="활동 인원"
            />
            <TextInput
              style={[styles.input, styles.box, { flex: 1 }]}
              onChangeText={value => {
                setContent(value);
              }}
              value={content}
              placeholder="활동 내용"
              textAlignVertical="top"
              multiline
            />
          </>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (disabled) {
            endEdit();
            if (isExtend) {
              extendActivity({
                variables: {
                  activityId: id,
                  date,
                  startTime,
                  endTime,
                  place,
                  room,
                },
              });
            } else if (id === 'new') {
              createActivity({
                variables: {
                  name,
                  userId,
                  type,
                  date,
                  startTime,
                  endTime,
                  total: parseInt(total, 10),
                  content,
                  place,
                  room,
                },
              });
            } else {
              modifyActivity({
                variables: {
                  activityId: id,
                  name,
                  userId,
                  type,
                  date,
                  startTime,
                  endTime,
                  total: parseInt(total, 10),
                  content,
                  place,
                  room,
                },
              });
            }
            navigation.navigate('Activity');
          } else {
            Alert.alert('내용을 모두 채워주시기 바랍니다.');
          }
        }}
      >
        <NanumGothicExtraBold style={styles.buttonText}>
          완료
        </NanumGothicExtraBold>
      </TouchableOpacity>
    </>
  );
}

Form.defaultProps = {
  id: 'new',
  selectedPlace: '',
  selectedRoom: '',
  isExtend: false,
};

Form.propTypes = {
  userId: PropTypes.string.isRequired,
  id: PropTypes.string,
  selectedPlace: PropTypes.string,
  selectedRoom: PropTypes.string,
  isExtend: PropTypes.bool,
};
