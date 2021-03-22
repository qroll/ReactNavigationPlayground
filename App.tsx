import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import InvisibleTabBar from './src/InvisibleTabBar';
import AStartScreen from './src/feature/A/StartScreen';
import AScreen1 from './src/feature/A/Screen1';
import AEndScreen from './src/feature/A/EndScreen';
import BStartScreen from './src/feature/B/BStartScreen';
import BScreen1 from './src/feature/B/BScreen1';
import BEndScreen from './src/feature/B/BEndScreen';
import { FeatureScreen } from './src/feature';
import { TabBarStatusProvider } from './src/useTabBarStatus';
import { CustomTabBar } from './src/CustomTabBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeStack = createStackNavigator();
const FeatureStack = createStackNavigator();
const CommonStack = createStackNavigator();
const PhantomStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Root = createStackNavigator();

const defaultCardStyleOptions: StyleProp<ViewStyle> = {
  // backgroundColor: 'black',
};

function PhantomStackScreen() {
  return (
    <PhantomStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <PhantomStack.Screen
        name="StartToDetails"
        component={StartToDetailsScreen}
        options={{
          title: 'Overview',
          cardStyle: defaultCardStyleOptions,
        }}
      />
      <PhantomStack.Screen name="Feature" component={FeatureScreen} />
      <PhantomStack.Screen name="AStartScreen" component={AStartScreen} />
      <PhantomStack.Screen name="AEndScreen" component={AEndScreen} />
      <PhantomStack.Screen name="BStartScreen" component={BStartScreen} />
      <PhantomStack.Screen name="BEndScreen" component={BEndScreen} />

      <Root.Screen name="AScreen1" component={AScreen1} />
      <Root.Screen name="BScreen1" component={BScreen1} />
    </PhantomStack.Navigator>
  );
}

function FeatureStackScreen() {
  return (
    <FeatureStack.Navigator initialRouteName="Feature">
      <FeatureStack.Screen
        name="Feature"
        component={FeatureScreen}
        options={{
          headerShown: false,
        }}
      />
    </FeatureStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingsStack.Screen name="Option" component={OptionScreen} />
    </SettingsStack.Navigator>
  );
}

function TabScreen() {
  return (
    <>
      <Tab.Navigator
        backBehavior="history"
        tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="FeatureTab" component={FeatureStackScreen} />
        <Tab.Screen name="HomeTab" component={HomeStackScreen} />
        <Tab.Screen name="SettingsTab" component={SettingsStackScreen} />
        {/* <Tab.Screen name="Phantom" component={PhantomStackScreen} /> */}
      </Tab.Navigator>
    </>
  );
}

function CommonStackScreen() {
  return (
    <>
      <CommonStack.Navigator
        screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
        <CommonStack.Screen
          name="Tabs"
          component={TabScreen}
          options={{ headerShown: false }}
        />

        <CommonStack.Screen
          name="StartToDetails"
          component={StartToDetailsScreen}
          options={{
            title: 'Overview',
            cardStyle: defaultCardStyleOptions,
          }}
        />

        <CommonStack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ ...TransitionPresets.SlideFromRightIOS }}
        />
        <CommonStack.Screen name="Option" component={OptionScreen} />

        <CommonStack.Screen name="AStartScreen" component={AStartScreen} />
        <CommonStack.Screen name="AEndScreen" component={AEndScreen} />
        <CommonStack.Screen name="BStartScreen" component={BStartScreen} />
        <CommonStack.Screen name="BEndScreen" component={BEndScreen} />

        <CommonStack.Screen name="AScreen1" component={AScreen1} />
        <CommonStack.Screen name="BScreen1" component={BScreen1} />
      </CommonStack.Navigator>
    </>
  );
}

function App() {
  return (
    <TabBarStatusProvider>
      <NavigationContainer
        ref={NavigationRef}
        theme={DefaultTheme}
        onStateChange={(state) => {
          // console.log('@@@ state', JSON.stringify(state));
        }}>
        <Root.Navigator
          mode="modal"
          screenOptions={{
            cardStyle: { backgroundColor: 'red' },
          }}>
          <Root.Screen
            name="Common"
            component={CommonStackScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/* startPage */}
          <Root.Screen name="Modal" component={ModalScreen} />
          <Root.Screen name="Maintenance" component={MaintenanceScreen} />
        </Root.Navigator>
      </NavigationContainer>
    </TabBarStatusProvider>
  );
}

export default App;
