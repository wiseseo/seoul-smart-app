import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Participant from './Participant';
import { font, normalize } from '../../constants/Layout';

export default function ParticipantsList({ participants }) {
  return (
    <FlatList
      style={{ alignSelf: 'stretch', padding: normalize(font * 1.4) }}
      data={participants}
      keyExtractor={({ userId }) => userId}
      renderItem={({ item: { name, comment } }) => (
        <Participant name={name} comment={comment} />
      )}
    />
  );
}

ParticipantsList.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
};
