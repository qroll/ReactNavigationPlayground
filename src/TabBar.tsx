import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TabBarStatusContext } from './useTabBarStatus';

function TabBar({ state, descriptors, navigation }) {
  const { setVisible } = useContext(TabBarStatusContext);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focusedOptions.tabBarVisible) {
      console.log('@@@ SHOW TAB BAR');
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
      }).start(() => {
        setVisible(true);
      });
    } else {
      console.log('@@@ HIDE TAB BAR');
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
      }).start(() => {
        setVisible(false);
      });
    }
  }, [focusedOptions.tabBarVisible, setVisible, animation]);

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
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

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

export default TabBar;
