import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from './withLogger';

function OptionScreen({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Option Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Option... again"
        onPress={() =>
          navigation.push('Option', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop" onPress={() => navigation.pop(2)} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

export default withLogger(OptionScreen);
