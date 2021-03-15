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
      <Stack.Screen name="HomeTab" component={HomeScreen} />
      <Stack.Screen name="FeatureTab" component={FeatureScreen} />
      <Stack.Screen name="SettingsTab" component={SettingsScreen} />

      <Stack.Screen
        name="StartToDetails"
        component={StartToDetailsScreen}
        options={{
          title: 'Overview',
          cardStyle: defaultCardStyleOptions,
        }}
      />
      <Stack.Screen
        name="AStartScreen"
        component={AStartScreen}
        options={{
          title: 'AStartScreen',
          cardStyle: defaultCardStyleOptions,
        }}
      />
      <Stack.Screen
        name="AEndScreen"
        component={AEndScreen}
        options={{
          title: 'AEndScreen',
          cardStyle: defaultCardStyleOptions,
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // transitionSpec: {
          //   open: {
          //     animation: 'timing',
          //     config: {
          //       duration: 500,
          //       easing: (value) => value,
          //     },
          //   },
          //   close: TransitionSpecs.FadeInFromBottomAndroidSpec,
          // },
          // animationTypeForReplace: "pop"
          // animationEnabled: false,
          // ...TransitionPresets.SlideFromRightIOS
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
    <>
      <Tab.Navigator backBehavior="history" tabBar={() => null}>
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
          console.log(JSON.stringify(state, null, 2));
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
      <DumbTabBar />
    </Provider>
  );
}

export default App;
