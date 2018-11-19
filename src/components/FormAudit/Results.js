import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import acc from 'accounting';

import FormEmail from './FormEmail';
import Metric from './Metric';
import MetricCircle from './MetricCircle';

const styles = theme => ({
  root: {
    '& .circle-container': {
      height: 150,
      width: 150,
      position: 'relative',
      margin: '0 auto',
      marginBottom: 8,
      '& > *': {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      '& .score': {
        width: 150,
        lineHeight: '150px',
      },
    },
    '& .circle-label': {
      fontSize: 16,
    },
  },
});

const Results = ({ classes, data, onBack }) => {
  return (
    <div className={classes.root}>
      <Grid container className="pb-5">
        <Grid item xs={12} md={9}>
          <div className="d-flex">
            <div>
              <img
                src={data.screenshot}
                className="rounded border img-fluid float-left mr-3"
                width="52"
                alt={data.url}
              />
            </div>
            <div className="flex-grow-1">
              <Typography variant="overline">Audit Results</Typography>
              <Typography variant="h4">{data.url}</Typography>
              <Typography variant="subtitle2">
                Page Size:{' '}
                <span className="pass">
                  {acc.formatNumber(data.totalSize.rawValue, 0)} KB
                </span>
              </Typography>
              <hr />
              <div>
                <button
                  type="button"
                  onClick={onBack}
                  className="btn btn-sm btn-light"
                >
                  &larr; Test another website
                </button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={3} className="text-center">
          <MetricCircle label="Performance" score={data.perf} />
        </Grid>
      </Grid>
      <section className="my-5 text-center">
        <Grid container spacing={8} justify="center">
          <Metric label="SEO" score={data.seo} />
          <Metric label="Speed Index" score={data.si.score} />
          <Metric label="Best Practices" score={data.bp} />
          <Metric label="Accessibility" score={data.acc} />
          <Metric label="PWA" score={data.pwa} />
        </Grid>
      </section>
      <FormEmail id={data._id} />
    </div>
  );
};

export default withStyles(styles)(Results);
