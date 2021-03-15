import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { store } from '../../redux/store';
import { withLogger } from '../../withLogger';

function AScreen1({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>A Screen 1</Text>
      <Button
        title="Go to A End Screen"
        onPress={() => {
          //   navigation.navigate('AEndScreen')
          navigation.push('Tabs', {
            screen: 'Phantom',
            params: { screen: 'AEndScreen' },
          });
          store.dispatch({ type: 'show' });
        }}
      />
    </View>
  );
}

export default withLogger(AScreen1);
