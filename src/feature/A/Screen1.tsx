import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from '../../withLogger';

function AScreen1({ navigation, route }) {
  const showTabBar = React.useCallback(() => {
    navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false });
  }, [navigation]);

  useFocusEffect(showTabBar);

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}>
      <Text style={{ fontSize: 30 }}>A Screen 1</Text>
      <Text style={{ fontSize: 25, marginBottom: 16 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec est eu
        nisi consectetur dignissim nec id erat. Phasellus mattis varius est quis
        viverra. Ut elementum fermentum pretium.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 16 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec est eu
        nisi consectetur dignissim nec id erat. Phasellus mattis varius est quis
        viverra. Ut elementum fermentum pretium. Vivamus non mattis purus, ut
        mollis mi. Etiam ullamcorper urna et elit lobortis, at suscipit sapien
        blandit. Suspendisse tempus, elit nec blandit accumsan, ex risus luctus
        magna, sed convallis nulla ante at sem. Duis eget neque viverra, varius
        diam non, tempor metus. Nulla euismod ex tellus, ut elementum nulla
        luctus ac. Aliquam consequat turpis purus, in sagittis elit elementum
        ut. Duis vel nisi arcu. Integer non dolor volutpat nunc ultrices
        sodales. Fusce non mauris quis justo consectetur molestie. Donec magna
        elit, finibus nec ex at, lobortis molestie tortor. Praesent tristique,
        urna sed auctor egestas, ante lorem ultricies nulla, placerat posuere
        quam purus a lacus.
      </Text>
      <Button
        title="Go to A End Screen"
        onPress={() => navigation.navigate('AEndScreen')}
      />
    </View>
  );
}

export default withLogger(AScreen1);
