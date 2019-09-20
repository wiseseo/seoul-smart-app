/* eslint-disable react/prop-types */
import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MainScreen from '../screens/MainScreen';
import PlaceScreen from '../screens/PlaceScreen';
import FilterScreen from '../screens/FilterScreen';
import ActivityScreen from '../screens/ActivityScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MainStack = createStackNavigator(
  {
    Main: MainScreen,
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

const PlaceStack = createStackNavigator(
  {
    Place: PlaceScreen,
    Filter: FilterScreen,
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
