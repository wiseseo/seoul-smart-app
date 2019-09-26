/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
  NanumGothicBold,
  NanumGothic,
  NanumGothicExtraBold,
} from '../StyledText';
import { font, normalize } from '../../constants/Layout';
import Colors from '../../constants/Colors';

const state = ['recruit', 'pauserecruit', 'ongoing', 'done'];
const kor = ['모집 중', '모집 마감', '진행 중', '진행 마감'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: normalize(font),
    paddingHorizontal: normalize(font * 0.6),
    paddingVertical: normalize(font),
    borderTopWidth: 1.4,
    borderTopColor: '#e2e2e3',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(font),
  },
  name: {
    fontSize: normalize(font * 1.2),
  },
  state: {
    alignSelf: 'flex-start',
    paddingHorizontal: normalize(font),
    paddingVertical: normalize(font * 0.4),
    borderRadius: normalize(font * 0.4),
  },
});

export default function Activity({ id, name, type, navigate, status }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('Detail', { id })}>
        <View style={styles.title}>
          <NanumGothicBold style={styles.name}>{name}</NanumGothicBold>
          <NanumGothic>{type}</NanumGothic>
        </View>
        <View style={[styles.state, { backgroundColor: Colors[status] }]}>
          <NanumGothicExtraBold style={{ color: 'white' }}>
            {kor[state.indexOf(status)]}
          </NanumGothicExtraBold>
        </View>
      </TouchableOpacity>
    </View>
  );
}

Activity.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
