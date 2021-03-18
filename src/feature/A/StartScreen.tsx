import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsTabBarVisible } from '../../useTabBarStatus';
import { withLogger } from '../../withLogger';

function AStartScreen({ navigation, route }) {
  const shouldNavigateNext = React.useRef(false);

  const showTabBar = React.useCallback(() => {
    navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true });
  }, [navigation]);

  useFocusEffect(showTabBar);

  const isVisible = useIsTabBarVisible();

  console.log('@@@ isVisible', isVisible);

  React.useEffect(() => {
    if (!isVisible && shouldNavigateNext.current) {
      navigation.navigate('AScreen1');
    }
  });

  return (
    // <ScrollView>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
      }}>
      <Text>A Start Screen</Text>
      <Button
        title="Go to A Screen 1"
        onPress={() => {
          navigation
            .dangerouslyGetParent()
            .setOptions({ tabBarVisible: false });
          shouldNavigateNext.current = true;
        }}
      />
      <Button
        title="Go to A End Screen"
        onPress={() => navigation.push('AEndScreen')}
      />
      <Button
        title="Hide nav bar"
        onPress={() => {
          navigation
            .dangerouslyGetParent()
            .setOptions({ tabBarVisible: false });
        }}
      />
      <Button
        title="Show nav bar"
        onPress={() => {
          navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true });
        }}
      />
      {/* <Text style={{ width: 200, textAlign: 'center' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec est
          eu nisi consectetur dignissim nec id erat. Phasellus mattis varius est
          quis viverra. Ut elementum fermentum pretium. Vivamus non mattis
          purus, ut mollis mi. Etiam ullamcorper urna et elit lobortis, at
          suscipit sapien blandit. Suspendisse tempus, elit nec blandit
          accumsan, ex risus luctus magna, sed convallis nulla ante at sem. Duis
          eget neque viverra, varius diam non, tempor metus. Nulla euismod ex
          tellus, ut elementum nulla luctus ac. Aliquam consequat turpis purus,
          in sagittis elit elementum ut. Duis vel nisi arcu. Integer non dolor
          volutpat nunc ultrices sodales. Fusce non mauris quis justo
          consectetur molestie. Donec magna elit, finibus nec ex at, lobortis
          molestie tortor. Praesent tristique, urna sed auctor egestas, ante
          lorem ultricies nulla, placerat posuere quam purus a lacus.
        </Text> */}
      <Button
        title="Hide nav bar"
        onPress={() => {
          navigation
            .dangerouslyGetParent()
            .setOptions({ tabBarVisible: false });
          // navigation.navigate('AScreen1');
        }}
      />
      <Button
        title="Show nav bar"
        onPress={() => {
          navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true });
          // navigation.navigate('AScreen1');
        }}
      />
    </View>
    // </ScrollView>
  );
}

export default withLogger(AStartScreen);
