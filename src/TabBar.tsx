import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  console.log('@@@ descriptors', descriptors);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{ flexDirection: 'row', height: 40, backgroundColor: 'green' }}>
      {['Home', 'Feature', 'Settings'].map((label, index) => {
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: label,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            navigation.navigate(label);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: label,
          });
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={index}>
            <Text
              style={{
                color: '#222',
                textAlign: 'center',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* {state.routes.map((route, index) => {
        if (route.name === 'Phantom') {
          return null;
        }

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
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={index}>
            <Text style={{ color: isFocused ? '#673ab7' : '#222', textAlign: 'center' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })} */}
    </View>
  );
}

export default TabBar;
