import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import HomeScreen from './src/HomeScreen';
import SettingsScreen from './src/SettingsScreen';
import DetailsScreen from './src/DetailsScreen';
import OptionScreen from './src/OptionScreen';
import ModalScreen from './src/ModalScreen';
import MaintenanceScreen from './src/MaintenanceScreen';
import { NavigationRef } from './src/NavigationRef';
import { Button, StyleProp, View, ViewStyle } from 'react-native';
import StartToDetailsScreen from './src/StartToDetailsScreen';
import TabBar from './src/TabBar';
import AStartScreen from './src/feature/A/StartScreen';
import AScreen1 from './src/feature/A/Screen1';
import AEndScreen from './src/feature/A/EndScreen';
import FeatureScreen from './src/feature';
import DumbTabBar from './src/DumbTabBar';
import { store } from './src/redux/store';
import {
  createCustomNavigator,
  createCustomTopNavigator,
} from './src/CustomNavigator';

const PhantomStack = createCustomNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Root = createCustomTopNavigator();

const defaultCardStyleOptions: StyleProp<ViewStyle> = {
  // backgroundColor: 'black',
};

function PhantomStackScreen() {
  return (
    <PhantomStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <PhantomStack.Screen name="HomeTab" component={HomeScreen} />
      <PhantomStack.Screen name="FeatureTab" component={FeatureScreen} />
      <PhantomStack.Screen name="SettingsTab" component={SettingsScreen} />

      <PhantomStack.Screen
        name="StartToDetails"
        component={StartToDetailsScreen}
        options={{
          title: 'Overview',
          cardStyle: defaultCardStyleOptions,
        }}
      />
      <PhantomStack.Screen
        name="AStartScreen"
        component={AStartScreen}
        options={{
          title: 'AStartScreen',
          cardStyle: defaultCardStyleOptions,
        }}
      />
      <PhantomStack.Screen
        name="AEndScreen"
        component={AEndScreen}
        options={{
          title: 'AEndScreen',
          cardStyle: defaultCardStyleOptions,
        }}
      />
    </PhantomStack.Navigator>
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
    <>
      <Tab.Navigator backBehavior="history" tabBar={DumbTabBar}>
        <Tab.Screen name="Phantom" component={PhantomStackScreen} />
      </Tab.Navigator>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer
        ref={NavigationRef}
        theme={DefaultTheme}
        onStateChange={(state) => {
          console.log('@@@ onStateChange', JSON.stringify(state));
          store.dispatch({ type: 'nav', navState: state });
        }}>
        <Root.Navigator
          mode="modal"
          screenOptions={{
            cardStyle: { backgroundColor: 'red' },
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Root.Screen
            name="Tabs"
            component={TabScreen}
            options={{ headerShown: false }}
          />
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
          <Root.Screen
            name="AScreen1"
            component={AScreen1}
            options={{ ...TransitionPresets.SlideFromRightIOS }}
          />
          <Root.Screen name="Option" component={OptionScreen} />
        </Root.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
