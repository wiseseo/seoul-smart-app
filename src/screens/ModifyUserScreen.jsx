/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import { MODIFY_USER, FIND_USER } from '../queries';
import { MonoText } from '../components/StyledText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});

export default function ModifyUserScreen({ navigation }) {
  const id = navigation.getParam('id');
  const [name, setName] = useState(navigation.getParam('name'));

  const [modifyUser] = useMutation(MODIFY_USER, {
    update(cache) {
      const { findUser } = cache.readQuery({
        query: FIND_USER,
        variables: { id },
      });
      findUser.name = name;
      cache.writeQuery({
        query: FIND_USER,
        variables: { id },
        data: { findUser },
      });
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <MonoText>mono 폰트 적용한 사용자정보수정</MonoText>
          <TextInput
            onChangeText={value => setName(value)}
            placeholder="사용자 이름"
            value={name}
          />
          <TouchableOpacity
            onPress={() => {
              modifyUser({ variables: { id, name } });
              navigation.push('Main');
            }}
          >
            <Text>저장</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

ModifyUserScreen.navigationOptions = {
  title: '사용자 정보수정',
};
