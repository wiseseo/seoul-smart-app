import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NanumGothicBold } from '../StyledText';
import { width, font, normalize } from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: width / 3,
    marginBottom: normalize(font),
    width: width / 3,
    height: width / 3,
    resizeMode: 'cover',
  },
});

export default function Nothing() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/NoInformation.png')}
        style={styles.image}
      />
      <NanumGothicBold
        style={{ fontSize: normalize(font * 1.4), color: '#707070' }}
      >
        일치하는 정보가 없습니다.
      </NanumGothicBold>
    </View>
  );
}
