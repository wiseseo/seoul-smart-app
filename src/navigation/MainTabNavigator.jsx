/* eslint-disable react/prop-types */
import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MainScreen from '../screens/MainScreen';
import EditUserScreen from '../screens/EditUserScreen';
import ParticipantListPage from '../screens/ParticipantListPage';
import PlaceScreen from '../screens/PlaceScreen';
import FilterScreen from '../screens/FilterScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ActivityOpenScreen from '../screens/ActivityOpenScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MainStack = createStackNavigator(
  {
    Main: MainScreen,
    Edit: EditUserScreen,
    ParticipantList: ParticipantListPage,
  },
  config
);

MainStack.navigationOptions = {
  tabBarLabel: 'Main',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

MainStack.path = '';

MainStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const PlaceStack = createStackNavigator(
  {
    Place: PlaceScreen,
    Filter: FilterScreen,
    Detail: PlaceDetailScreen,
  },
  config
);

PlaceStack.navigationOptions = {
  tabBarLabel: 'Place',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

PlaceStack.path = '';

const ActivityStack = createStackNavigator(
  {
    Activity: ActivityScreen,
    Open: ActivityOpenScreen,
    Detail: ActivityDetailScreen,
  },
  config
);

ActivityStack.navigationOptions = {
  tabBarLabel: 'Activity',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

ActivityStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MainStack,
  PlaceStack,
  ActivityStack,
});

tabNavigator.path = '';

const MainTabNavigator = createStackNavigator({
  tabNavigator: {
    screen: tabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

export default MainTabNavigator;
