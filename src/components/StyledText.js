/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'react-native';

export function MonoText({ style }) {
  return <Text style={[style, { fontFamily: 'space-mono' }]} />;
}

export function NanumGothic({ style }) {
  return <Text style={[style, { fontFamily: 'nanum-gothic' }]} />;
}

export function NanumGothicBold({ style }) {
  return <Text style={[style, { fontFamily: 'nanum-gothic-bold' }]} />;
}

export function NanumGothicExtraBold({ style }) {
  return <Text style={[style, { fontFamily: 'nanum-gothic-extra-bold' }]} />;
}
