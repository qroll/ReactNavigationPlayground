import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from '../../withLogger';

function AEndScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>A Screen 1</Text>
      <Button
        title="Go to A Start Screen"
        onPress={() =>
          navigation.pop(2)
        }
      />
    </View>
  );
}

export default withLogger(AEndScreen);