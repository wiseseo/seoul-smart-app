/* eslint-disable react/prop-types */
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { normalize, font, height } from '../../constants/Layout';
import Equipment from './Equipment';
import Colors from '../../constants/Colors';
import { NanumGothic, NanumGothicBold } from '../StyledText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: normalize(font),
    borderTopColor: '#e2e2e3',
    borderTopWidth: 1,
    paddingHorizontal: normalize(font / 2),
    paddingBottom: normalize(font),
  },
  image: {
    height: height / 3,
    resizeMode: 'contain',
  },
  title: {
    marginVertical: normalize(font),
    fontSize: normalize(font * 1.4),
  },
  description: {
    marginVertical: normalize(font),
  },
  equipment: {
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  button: {
    borderColor: Colors.mainColor,
    borderWidth: 1.4,
    borderRadius: normalize(font),
    paddingVertical: normalize(font / 2),
    paddingHorizontal: normalize(font * 0.8),
  },
  select: {
    color: Colors.mainColor,
  },
});

export default function Room({
  name,
  uri,
  description,
  equipments,
  place,
  selectable,
  navigation,
}) {
  const equipmentList = equipments.map(equipment => (
    <Equipment key={name + equipment} text={equipment} />
  ));
  return (
    <View style={styles.container}>
      <NanumGothicBold style={styles.title}>{name}</NanumGothicBold>
      <View>
        <Image source={{ uri }} style={styles.image} />
      </View>
      <NanumGothic style={styles.description}>{description}</NanumGothic>
      <View style={styles.equipment}>{equipmentList}</View>
      {selectable && (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('Edit', { place, room: name })}
          >
            <NanumGothicBold style={styles.select}>선택하기</NanumGothicBold>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

Room.defaultProps = {
  selectable: false,
};

Room.propTypes = {
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  equipments: PropTypes.arrayOf(PropTypes.string).isRequired,
  place: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
};
