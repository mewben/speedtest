import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
//import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../components/Layout';
import FormAudit from '../components/FormAudit';
import withRoot from '../withRoot';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#fff',
    },
  },
  hero: {
    marginTop: 120,
    marginBottom: 120,
    textAlign: 'center',
  },
  formSection: {
    backgroundColor: '#f8f9fa',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 64,
    paddingBottom: 64,
  },
  formContainer: {
    maxWidth: 960,
    width: '100%',
    '& .flex': {
      display: 'flex',
    },
    '& .flex-column': {
      flexDirection: 'column',
    },
    '& .justify-center': {
      justifyContent: 'center',
    },
    '& .text-center': {
      textAlign: 'center',
    },
    '& .text-center': {
      textAlign: 'center',
    },
    '& .pass-bg': {
      backgroundColor: green[400],
      color: '#fff',
    },
    '& .pass': {
      color: green[400],
    },
  },
});

const measure = ({ classes }) => (
  <Fade in>
    <Layout>
      <Grid container justify="center">
        <div className={classes.hero}>
          <Typography variant="subtitle1">
            Haven't checked your website yet?
          </Typography>
          <Typography variant="h2">Test your Website now!</Typography>
        </div>
      </Grid>
      <div className={classes.formSection}>
        <div className={classes.formContainer}>
          <FormAudit />
        </div>
      </div>
    </Layout>
  </Fade>
);

export default withRoot(withStyles(styles)(measure));
