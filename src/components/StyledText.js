import React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}

export function NanumGothic(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'nanum-gothic' }]} />
  );
}

export function NanumGothicBold(props) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: 'nanum-gothic-bold' }]}
    />
  );
}

export function NanumGothicExtraBold(props) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: 'nanum-gothic-extra-bold' }]}
    />
  );
}
