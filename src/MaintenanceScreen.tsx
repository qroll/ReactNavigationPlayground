import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { CommonActions, StackActions } from '@react-navigation/native';
import { withLogger } from './withLogger';
import { NavigationRef } from './NavigationRef';

function MaintenanceScreen() {
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Text>GO AWAY</Text>
    </View>
  );
}

export default withLogger(MaintenanceScreen);
