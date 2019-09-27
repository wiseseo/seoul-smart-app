/* eslint-disable react/prop-types */
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { NanumGothicBold } from '../StyledText';
import { font, normalize } from '../../constants/Layout';
import Activity from './Activity';
import Nothing from '../Nothing';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  title: {
    paddingVertical: normalize(font),
    paddingHorizontal: normalize(font * 1.4),
    fontSize: normalize(font * 1.2),
  },
});

export default function ActivityLogs({ activityLogs, navigate }) {
  return (
    <View style={styles.container}>
      <NanumGothicBold style={styles.title}>내 활동이력</NanumGothicBold>
      {activityLogs.length ? (
        <FlatList
          data={activityLogs}
          keyExtractor={({ activityId }) => activityId}
          renderItem={({ item: { activityId, name, status, type } }) => (
            <Activity
              key={activityId}
              id={activityId}
              name={name}
              status={status}
              type={type}
              navigate={navigate}
            />
          )}
        />
      ) : (
        <Nothing />
      )}
    </View>
  );
}

ActivityLogs.defaultProps = {
  activityLogs: [],
};

ActivityLogs.propTypes = {
  activityLogs: PropTypes.arrayOf(PropTypes.object),
};
