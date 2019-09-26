/* eslint-disable react/prop-types */
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
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
    marginHorizontal: 16,
    paddingHorizontal: 4,
    paddingVertical: 14,
    borderTopWidth: 1.4,
    borderTopColor: '#e2e2e3',
  },
  title: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    fontSize: normalize(font * 1.2),
  },
  state: {
    paddingHorizontal: normalize(font),
    paddingVertical: normalize(font * 0.4),
    borderRadius: normalize(font * 0.4),
  },
});

export default function Activity({ id, name, type, status, navigate }) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(
          'ActivityStack',
          {},
          NavigationActions.navigate({
            routeName: 'Detail',
            params: { id },
          })
        )
      }
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <NanumGothicBold style={styles.name}>{name}</NanumGothicBold>
          <View style={[styles.state, { backgroundColor: Colors[status] }]}>
            <NanumGothicExtraBold style={{ color: 'white' }}>
              {kor[state.indexOf(status)]}
            </NanumGothicExtraBold>
          </View>
        </View>
        <NanumGothic>{type}</NanumGothic>
      </View>
    </TouchableOpacity>
  );
}

Activity.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
