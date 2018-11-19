import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import acc from 'accounting';
import cn from 'classnames';

const MetricCircle = ({ label, score = 0 }) => {
  const cl = cn('score', {
    'text-danger': score <= 0.49,
    'text-warning': score > 0.49 && score <= 0.89,
    'text-success': score > 0.89,
  });
  const displayScore = acc.formatNumber(score * 100);

  return (
    <div>
      <div className="circle-container">
        <CircularProgress
          variant="static"
          value={100}
          size={150}
          thickness={1}
          style={{ color: grey[200] }}
        />
        <CircularProgress
          variant="static"
          value={displayScore - 0}
          size={150}
          thickness={1}
        />
        <Typography variant="h3" className={cl}>
          {displayScore}
        </Typography>
      </div>
      <Typography variant="caption" className="circle-label">
        {label}
      </Typography>
    </div>
  );
};

export default MetricCircle;
