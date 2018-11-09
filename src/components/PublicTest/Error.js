import React from 'react';
import { Transition } from 'react-spring';

const Error = ({ msg }) => {
  return (
    <Transition
      from={{ position: 'absolute', bottom: 100, opacity: 0 }}
      enter={{ opacity: 1, bottom: 180, left: 234 }}
      leave={{ opacity: 0 }}
    >
      {styles => (
        <div style={styles} className="snackbar error">
          <span>❗️</span>
          {msg}
        </div>
      )}
    </Transition>
  );
};

export default Error;
