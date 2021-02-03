import * as React from 'react';

export const withLogger = (Component, options) => (props) => {
  console.log(
    `@@@ ${Component.name} => ${JSON.stringify(props.route.params, null, 2)}`,
  );
  return <Component {...props} />;
};
