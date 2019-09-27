/* eslint-disable react/prop-types */
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_PLACE, GET_EDIT } from '../queries';
import PlaceDescription from '../components/PlaceDescription';
import RoomList from '../components/RoomList';
import Slide from '../components/Slide';
import { NanumGothicExtraBold } from '../components/StyledText';
import Colors from '../constants/Colors';
import { font, normalize } from '../constants/Layout';
import { useBack } from '../lib';
import Error from '../components/Error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: Colors.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: normalize(font * 1.4),
    paddingVertical: normalize(font),
  },
});

export default function PlaceDetailScreen({ navigation }) {
  const id = navigation.getParam('id');
  const { loading, error, data } = useQuery(GET_PLACE, {
    variables: { id },
  });

  const select = useQuery(GET_EDIT);

  useBack(() => navigation.goBack());
  if (loading) return <Text>로딩</Text>;
  if (error) return <Error />;

  const {
    name,
    location: { address },
    businessHour,
    contact,
    rooms,
    bookLink,
  } = data.findPlace;

  const images = rooms.map(({ thumbnail }) => thumbnail);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Slide images={images} />
        <PlaceDescription
          name={name}
          address={address}
          businessHour={businessHour}
          contact={contact}
        />
        <RoomList
          rooms={rooms}
          place={name}
          selectable={select.data.edit.editing}
          navigation={navigation}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            WebBrowser.openBrowserAsync(bookLink);
          }}>
          <NanumGothicExtraBold style={styles.text}>
            예약링크로 이동
          </NanumGothicExtraBold>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

PlaceDetailScreen.navigationOptions = {
  title: '장소 상세 보기',
};
