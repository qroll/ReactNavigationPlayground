import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from '../../withLogger';

function AStartScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>A Start Screen</Text>
      <Button
        title="Go to A Screen 1"
        onPress={() =>
          navigation.navigate('AScreen1')
        }
      />
      <Button
        title="Go to A End Screen"
        onPress={() =>
          navigation.push('AEndScreen')
        }
      />
    </View>
  );
}

export default withLogger(AStartScreen);