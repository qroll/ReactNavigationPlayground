import {
  CommonActions,
  StackActions,
  TabActions,
  useNavigation,
} from '@react-navigation/native';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { NavigationRef } from './NavigationRef';
import { TabBarStatusContext } from './useTabBarStatus';

const Tabs = [
  {
    screenName: 'FeatureTab',
    label: 'Feature',
  },
  {
    screenName: 'HomeTab',
    label: 'Home',
  },
  {
    screenName: 'SettingsTab',
    label: 'Settings',
  },
];

export function CustomTabBar() {
  const { show: tabBarVisible, setVisible, tabBarProps } = useContext(
    TabBarStatusContext,
  );

  const { state, descriptors, navigation } = tabBarProps;

  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (tabBarVisible) {
      console.log('@@@ SHOW CUSTOM TAB BAR');
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
      }).start(() => {
        setVisible(true);
      });
    } else {
      console.log('@@@ HIDE CUSTOM TAB BAR');
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
      }).start(() => {
        setVisible(false);
      });
    }
  }, [tabBarVisible, setVisible, animation]);

  if (!state) {
    return null;
  }

  return (
    <Animated.View
      style={{
        backgroundColor: '#bdb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Animated.interpolate(animation, {
          inputRange: [0, 1],
          outputRange: [0, 80],
        }),
        // opacity: animation
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // get Common Stack state
        const CommonStackState = NavigationRef.current
          ?.getRootState()
          .routes.find((r) => r.name === 'Common').state;
        const i = CommonStackState?.index;
        const screenName = CommonStackState?.routes[i].name;

        const isFocused = state.index === index && screenName === 'Tabs';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          NavigationRef.current?.dispatch(
            CommonActions.navigate('Common', { screen: 'Tabs' }),
          );

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ margin: 16, flex: 1 }}>
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}
