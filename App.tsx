import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/HomeScreen';
import SettingsScreen from './src/SettingsScreen';
import DetailsScreen from './src/DetailsScreen';
import OptionScreen from './src/OptionScreen';
import ModalScreen from './src/ModalScreen';
import MaintenanceScreen from './src/MaintenanceScreen';
import { NavigationRef } from './src/NavigationRef';
import { Button, StyleProp, ViewStyle } from 'react-native';
import StartToDetailsScreen from './src/StartToDetailsScreen';
import TabBar from './src/TabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Root = createStackNavigator();

const defaultCardStyleOptions: StyleProp<ViewStyle> = {
  // backgroundColor: 'black',
};

function PhantomStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        // transitionSpec: {
        //   open: TransitionSpecs.FadeInFromBottomAndroidSpec,
        //   close: TransitionSpecs.FadeInFromBottomAndroidSpec,
        // },
        // cardStyleInterpolator: ({ current: { progress } }) => ({
        //   containerStyle: {
        //     opacity: progress,
        //   },
        // }),
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="StartToDetails"
        component={StartToDetailsScreen}
        options={{
          title: 'Overview',
          cardStyle: defaultCardStyleOptions,
        }}
      />
    </Stack.Navigator>
  );
}

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
      {/* <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Overview',
          cardStyle: defaultCardStyleOptions,
        }}
      /> */}
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
    <Tab.Navigator
      backBehavior="history"
      tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} />
      <Tab.Screen name="Phantom" component={PhantomStackScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer
      ref={NavigationRef}
      theme={DefaultTheme}
      onStateChange={(state) => console.log(JSON.stringify(state, null, 2))}>
      <Root.Navigator
        mode="modal"
        screenOptions={{ cardStyle: { backgroundColor: 'red' } }}>
        <Root.Screen name="Tabs" component={TabScreen} />
        {/* startPage */}
        <Root.Screen name="Modal" component={ModalScreen} />
        <Root.Screen name="Maintenance" component={MaintenanceScreen} />
        <Root.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            // transitionSpec: {
            //   open: TransitionSpecs.TransitionIOSSpec,
            //   close: TransitionSpecs.TransitionIOSSpec,
            // },
            // cardStyleInterpolator: ({ current: { progress } }) => ({
            //   containerStyle: {
            //     opacity: progress,
            //   },
            // }),
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Root.Screen name="Option" component={OptionScreen} />
      </Root.Navigator>
    </NavigationContainer>
  );
}

export default App;
