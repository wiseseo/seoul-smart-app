import React from 'react';
import ProgressCircle from 'react-native-progress-circle';
import PropTypes from 'prop-types';
import { NanumGothicExtraBold, NanumGothic } from '../StyledText';
import Colors from '../../constants/Colors';
import { width } from '../../constants/Layout';

export default function Achievement({ achievement }) {
  const radius = width / 6;
  return (
    <ProgressCircle
      percent={achievement}
      radius={radius}
      borderWidth={radius / 8}
      color={Colors.mainColor}
      shadowColor={Colors.tintColor}
      bgColor="white">
      <NanumGothicExtraBold
        style={{ fontSize: radius / 2, color: Colors.mainColor }}>
        {achievement}
      </NanumGothicExtraBold>
      <NanumGothic>/100</NanumGothic>
    </ProgressCircle>
  );
}

Achievement.propTypes = {
  achievement: PropTypes.number.isRequired,
};
