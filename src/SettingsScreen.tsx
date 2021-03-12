import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from './withLogger';

export function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button
        title="Go to Option"
        onPress={() => navigation.push('Option', { itemId: 1 })}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.push('Details', { itemId: 1337 })}
      />
      <Button
        title="Go to Start Details Flow"
        onPress={() => navigation.push('Tabs', {
          screen: 'Phantom',
          params: { screen: 'StartToDetails' },
        })}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop" onPress={() => navigation.pop()} />
    </View>
  );
}

export default withLogger(SettingsScreen);
