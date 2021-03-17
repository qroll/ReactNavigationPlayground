import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from '../../withLogger';

function AScreen1({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>A Screen 1</Text>
      <Button
        title="Go to A End Screen"
        onPress={() => {
          navigation.push('Tabs', {
            screen: 'Phantom',
            params: { screen: 'AEndScreen' },
          });
        }}
      />
    </View>
  );
}

export default withLogger(AScreen1);
