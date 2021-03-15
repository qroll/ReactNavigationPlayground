import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from './withLogger';

const HomeScreen = ({ navigation, route }) => {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>Count: {count}</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.push('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
      <Button
        title="Go to Start Details Flow"
        onPress={() =>
          navigation.navigate('Tabs', {
            screen: 'Phantom',
            params: { screen: 'StartToDetails' },
          })
        }
      />
      <Button
        title="Go to Options"
        onPress={() => navigation.navigate('Option', { itemId: 123 })}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
      <Button
        title="Go to Feature A"
        onPress={() => navigation.navigate('AStartScreen')}
        // onPress={() => navigation.push('Tabs', {
        //     screen: 'Phantom',
        //     params: { screen: 'AStartScreen' },
        //   })}
        //   onPress={() => navigation.push('HomeTab', {
        //     itemId: 85,
        //     otherParam: 'anything you want here',
        //   })}
      />
    </View>
  );
};

export default withLogger(HomeScreen);
