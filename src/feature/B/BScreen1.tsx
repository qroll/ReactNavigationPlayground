import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from '../../withLogger';

function BScreen1({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>B Screen 1</Text>
      <Button
        title="Go to B End Screen"
        onPress={() => navigation.navigate('BEndScreen')}
      />
    </View>
  );
}

export default withLogger(BScreen1);
