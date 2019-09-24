/* eslint-disable react/prop-types */
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { useQuery } from '@apollo/react-hooks';
import { GET_PLACE, GET_EDIT } from '../queries';
import PlaceDescription from '../components/PlaceDescription';
import RoomList from '../components/RoomList';
import Slide from '../components/Slide';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function PlaceDetailScreen({ navigation }) {
  const id = navigation.getParam('id');
  const { loading, error, data } = useQuery(GET_PLACE, {
    variables: { id },
  });

  const select = useQuery(GET_EDIT);

  if (loading) return <Text>로딩</Text>;
  if (error) return <Text>에러</Text>;

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
          onPress={() => {
            WebBrowser.openBrowserAsync(bookLink);
          }}>
          <Text>예약하러가기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

PlaceDetailScreen.navigationOptions = {
  title: '장소 상세 보기',
};
