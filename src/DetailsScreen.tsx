import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { withLogger } from './withLogger';

function DetailsScreen({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop" onPress={() => navigation.pop(2)} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Button
        title="Go to Settings"
        onPress={() => {
          navigation.navigate('Settings', {
            screen: 'Option',
            params: { itemId: 3, otherParam: 'From settings' },
          });
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Settings' },
                {
                  name: 'Option',
                  params: { itemId: 1 },
                },
              ],
            }),
          );
        }}
      />
    </View>
  );
}

export default withLogger(DetailsScreen);
