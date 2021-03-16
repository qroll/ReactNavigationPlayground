import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';

export const withLogger = (Component, options?) => (props) => {
  // console.log(
  //   `@@@ ${Component.name} => ${JSON.stringify(props.route.params, null, 2)}`,
  // );

  React.useEffect(() => {
    console.log(`@@@ ${Component.name} mounted`);
    return () => console.log(`@@@ ${Component.name} unmounted`);
  }, []);

  const onFocus = React.useCallback(() => {
    console.log(`@@@ ${Component.name} focused`);
  }, []);

  useFocusEffect(onFocus);

  return <Component {...props} />;
};
