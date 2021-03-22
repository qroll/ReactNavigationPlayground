import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  useEventEmitter,
  useNavigateAfterTabAnimation,
} from '../../useTabBarStatus';
import { withLogger } from '../../withLogger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  image: {
    backgroundColor: '#abc',
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 36,
  },
  header: { fontSize: 30, marginBottom: 16 },
  subtitle: { fontSize: 25, marginBottom: 16 },
  body: { fontSize: 16, marginBottom: 16 },
});

function AStartScreen({ navigation, route }) {
  const navigateAfterTabAnimation = useNavigateAfterTabAnimation({
    visible: false,
  });

  const eventEmitter = useEventEmitter();

  React.useEffect(() => {
    const id = navigation.addListener('transitionEnd', () => {
      const isFocused = navigation.isFocused();
      if (!isFocused) {
        eventEmitter.emit('exitEvent');
      }
    });
    return () => navigation.removeListener(id);
  }, [navigation, eventEmitter]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.image} />
        <Text style={styles.header}>A Start Screen</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec est
          eu nisi consectetur dignissim nec id erat.
        </Text>
        <Button
          title="Go to A Screen 1"
          onPress={() => {
            navigateAfterTabAnimation('AScreen1');
          }}
        />
        <Button
          title="Go to A End Screen"
          onPress={() => navigation.push('AEndScreen')}
        />
        <Text style={styles.body}>
          Etiam ullamcorper urna et elit lobortis, at suscipit sapien blandit.
          Suspendisse tempus, elit nec blandit accumsan, ex risus luctus magna,
          sed convallis nulla ante at sem. Duis eget neque viverra, varius diam
          non, tempor metus. Nulla euismod ex tellus, ut elementum nulla luctus
          ac.
        </Text>
        <Button
          title="Show modal"
          // onPress={() =>
          //   navigateAfterTabAnimation('Modal', {
          //     onDismiss: () => setTabBarVisible(true),
          //   })
          // }
          onPress={() => navigation.navigate('Modal')}
        />
        <Text style={styles.body}>
          Suspendisse efficitur odio sed ex blandit, in aliquet lacus faucibus.
          Suspendisse potenti. Proin nec purus non nibh pulvinar pretium. Nulla
          rhoncus lacus velit, et ultricies augue pulvinar a. Morbi fringilla
          elit suscipit nisi blandit, id maximus justo dictum. Quisque vitae sem
          molestie, pretium ligula vel, luctus nunc. Etiam nec augue vehicula,
          vulputate tellus id, tincidunt dui. Vivamus quis molestie leo.
          Pellentesque sit amet sagittis lorem, accumsan laoreet turpis.
          Curabitur elit quam, malesuada non justo id, egestas fringilla nulla.
        </Text>
      </View>
    </ScrollView>
  );
}

export default withLogger(AStartScreen);
