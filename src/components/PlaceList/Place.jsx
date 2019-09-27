import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { normalize, font } from '../../constants/Layout';
import { NanumGothicBold, NanumGothic } from '../StyledText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: normalize(font),
    paddingVertical: normalize(font * 0.8),
    paddingHorizontal: normalize(font * 0.9),
    borderTopColor: '#e2e2e3',
    borderTopWidth: 1.4,
  },
  textView: {
    flex: 6,
    marginVertical: normalize(font * 0.6),
  },
  title: {
    marginBottom: normalize(font * 0.8),
    fontSize: normalize(font * 1.2),
  },
  imageView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
  },
});

export default function Place({ id, name, address, uri, navigate }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('Detail', { id })}
    >
      <View style={styles.textView}>
        <NanumGothicBold style={styles.title}>{name}</NanumGothicBold>
        <NanumGothic>{address}</NanumGothic>
      </View>
      <View style={styles.imageView}>
        <Image source={{ uri }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

Place.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};
