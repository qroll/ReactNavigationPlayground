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
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop" onPress={() => navigation.pop()} />
    </View>
  );
}

export default withLogger(SettingsScreen);
