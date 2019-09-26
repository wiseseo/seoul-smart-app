import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import { font, normalize } from '../../constants/Layout';
import { NanumGothicExtraBold, NanumGothic } from '../StyledText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: normalize(font),
  },
  title: {
    paddingHorizontal: normalize(font / 2),
    color: Colors.mainColor,
    fontSize: normalize(font * 1.5),
    paddingVertical: normalize(font),
    borderBottomColor: '#e2e2e3',
    borderBottomWidth: 1,
  },
  info: {
    flexDirection: 'row',
    paddingVertical: normalize(font),
  },
  infoText: {
    flex: 1,
    color: '#707070',
  },
  infoImage: {
    width: normalize(font * 1.2),
    height: normalize(font * 1.2),
    resizeMode: 'contain',
    marginHorizontal: normalize(font),
  },
});

export default function PlaceDescription({
  name,
  address,
  contact,
  businessHour,
}) {
  return (
    <View style={styles.container}>
      <NanumGothicExtraBold style={styles.title}>{name}</NanumGothicExtraBold>
      <View style={styles.info}>
        <Image
          style={styles.infoImage}
          source={require('./../../assets/images/Places_Gray.png')}
        />
        <NanumGothic style={styles.infoText}>{address}</NanumGothic>
      </View>
      <View style={styles.info}>
        <Image
          style={styles.infoImage}
          source={require('./../../assets/images/Phone_Gray.png')}
        />
        <NanumGothic style={styles.infoText}>{contact}</NanumGothic>
      </View>
    </View>
  );
}

PlaceDescription.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  businessHour: PropTypes.string.isRequired,
};
