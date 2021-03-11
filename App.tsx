import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/HomeScreen';
import SettingsScreen from './src/SettingsScreen';
import DetailsScreen from './src/DetailsScreen';
import OptionScreen from './src/OptionScreen';
import ModalScreen from './src/ModalScreen';
import MaintenanceScreen from './src/MaintenanceScreen';
import { NavigationRef } from './src/NavigationRef';
import { StyleProp, ViewStyle } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Root = createStackNavigator();

const defaultCardStyleOptions: StyleProp<ViewStyle> = {
  // backgroundColor: 'black',
};

function HomeStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Overview',
          cardStyle: defaultCardStyleOptions,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Overview',
          cardStyle: defaultCardStyleOptions,
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ cardStyle: defaultCardStyleOptions }}
      />
      <Stack.Screen
        name="Option"
        component={OptionScreen}
        options={{ cardStyle: defaultCardStyleOptions }}
      />
    </Stack.Navigator>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer ref={NavigationRef} theme={DefaultTheme}>
      <Root.Navigator
        mode="modal"
        screenOptions={{ cardStyle: { backgroundColor: 'red' } }}>
        <Root.Screen name="Tabs" component={TabScreen} />
        <Root.Screen name="Modal" component={ModalScreen} />
        <Root.Screen name="Maintenance" component={MaintenanceScreen} />
      </Root.Navigator>
    </NavigationContainer>
  );
}

export default App;
