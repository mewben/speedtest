import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import acc from 'accounting';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

const styles = theme => ({
  root: {
    '& .over': {
      '& span + span': {
        fontSize: 16,
      },
    },
  },
});

const Metric = ({ label, score = 0, classes }) => {
  const cl = cn({
    'text-danger': score <= 0.49,
    'text-warning': score > 0.49 && score <= 0.89,
    'text-success': score > 0.89,
  });
  const displayScore = acc.formatNumber(score * 100);
  return (
    <Grid item xs={2} className={classes.root}>
      <div className="over">
        <Typography variant="h3">
          <span className={cl}>{displayScore}</span>
          <span className="text-muted">/100</span>
        </Typography>
      </div>
      <Typography variant="subtitle2">{label}</Typography>
    </Grid>
  );
};

export default withStyles(styles)(Metric);
