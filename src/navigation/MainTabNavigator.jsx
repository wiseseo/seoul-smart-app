/* eslint-disable react/prop-types */
import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MainScreen from '../screens/MainScreen';
import ModifyUserScreen from '../screens/ModifyUserScreen';
import ParticipantsScreen from '../screens/ParticipantsScreen';
import PlaceScreen from '../screens/PlaceScreen';
import FilterScreen from '../screens/FilterScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ActivityEditScreen from '../screens/ActivityEditScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const PlaceStack = createStackNavigator(
  {
    Place: PlaceScreen,
    Filter: FilterScreen,
    Detail: PlaceDetailScreen,
  },
  config
);

PlaceStack.path = '';

PlaceStack.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state;
  const tabBarVisible = !navigation.state.index;

  return {
    tabBarVisible,
    tabBarLabel: '장소페이지',
    header: params ? params.header : undefined,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name="PlacePage" />
    ),
  };
};

const ActivityStack = createStackNavigator(
  {
    Activity: ActivityScreen,
    Edit: ActivityEditScreen,
    Detail: ActivityDetailScreen,
    Participants: ParticipantsScreen,
  },
  config
);

ActivityStack.path = '';

ActivityStack.navigationOptions = ({ navigation }) => {
  const tabBarVisible = !navigation.state.index;

  return {
    tabBarVisible,
    tabBarLabel: '활동페이지',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name="ActivityPage" />
    ),
  };
};

const MainStack = createStackNavigator(
  {
    Main: MainScreen,
    Modify: ModifyUserScreen,
  },
  config
);

MainStack.path = '';

MainStack.navigationOptions = ({ navigation }) => {
  const tabBarVisible = !navigation.state.index;

  return {
    tabBarVisible,
    tabBarLabel: '마이페이지',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="MyPage" />,
  };
};

const tabNavigator = createBottomTabNavigator(
  {
    MainStack,
    PlaceStack,
    ActivityStack,
  },
  {
    tabBarOptions: {
      style: {
        height: 54,
        backgroundColor: '#0287cb',
      },
      activeTintColor: '#fff',
      inactiveTintColor: 'rgba(255,255,255,0.5)',
    },
  }
);

tabNavigator.path = '';

const MainTabNavigator = createStackNavigator({
  tabNavigator: {
    screen: tabNavigator,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default MainTabNavigator;
