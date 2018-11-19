import React from 'react';
import cn from 'classnames';

const MetricText = ({ score = 0, text }) => {
  const cl = cn('pass', {
    'text-danger': score <= 0.49,
    'text-warning': score > 0.49 && score <= 0.89,
    'text-success': score > 0.89,
  });
  return <span className={cl}>{text}</span>;
};

export default MetricText;
