import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { NavigationRef } from './NavigationRef';

export const withLogger = (Component, options?) => (props) => {
  // console.log(
  //   `@@@ ${Component.name} => ${JSON.stringify(props.route.params, null, 2)}`,
  // );

  React.useEffect(() => {
    console.log(`@@@ ${Component.name} mounted`);
    return () => console.log(`@@@ ${Component.name} unmounted`);
  }, []);

  React.useEffect(() => {
    console.log(`@@@ ${Component.name} rendered`);
  });

  const onFocus = React.useCallback(() => {
    console.log(`@@@ ${Component.name} focused`);
  }, []);

  useFocusEffect(onFocus);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('transitionStart', (e) => {
      console.log(`@@@ ${Component.name} transitionStart`);
    });

    return unsubscribe;
  }, [props.navigation]);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('transitionEnd', (e) => {
      console.log(`@@@ ${Component.name} transitionEnd`);
    });

    return unsubscribe;
  }, [props.navigation]);

  return <Component {...props} />;
};
