import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationRef } from './NavigationRef';

function TabBar() {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 80,
        backgroundColor: 'green',
      }}>
      {['HomeTab', 'FeatureTab', 'SettingsTab'].map((label, index) => {
        const onPress = () => {
          NavigationRef.current?.dispatch(CommonActions.navigate(label));
        };

        const onLongPress = () => {};

        return (
          <TouchableOpacity
            accessibilityRole="button"
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
    </View>
  );
}

export default TabBar;
