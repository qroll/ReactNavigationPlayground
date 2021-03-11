import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from './withLogger';

function StartToDetailsScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Start of Details Flow</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
    </View>
  );
}

export default withLogger(StartToDetailsScreen);
