import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NanumGothicBold, NanumGothic } from '../StyledText';
import { width, font, normalize } from '../../constants/Layout';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: width / 3,
    marginBottom: normalize(font),
    width: width / 5,
    height: width / 5,
    resizeMode: 'cover',
  },
});

export default function Error() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/Caution.png')}
        style={styles.image}
      />
      <NanumGothicBold
        style={{ fontSize: normalize(font * 1.4), color: Colors.mainColor }}
      >
        일시적인 오류입니다.
      </NanumGothicBold>
      <NanumGothic
        style={{
          color: '#707070',
          paddingVertical: normalize(font),
          paddingHorizontal: width / 3,
        }}
      >
        네트워크 연결 상태를 확인하거나, 잠시 후 다시 이용해주세요.
      </NanumGothic>
    </View>
  );
}
