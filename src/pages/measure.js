import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import 'bootstrap/dist/css/bootstrap.min.css';
import { parse } from 'qs';
import axios from 'axios';
import get from 'lodash/get';

import Layout from '../components/Layout';
import { pusher } from '../components/Layout/withPusher';
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
    '& .pass-bg': {
      backgroundColor: green[400],
      color: '#fff',
    },
    '& .pass': {
      color: green[400],
    },
  },
});

class Measure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      result: {},
    };
  }

  componentDidMount() {
    console.log('didmount', this.props);
    // get search params
    const q = this._getQueryParams();
    if (q.id) {
      // check if result is in the state
      const nextResult = get(this.props, 'location.state.result') || {};
      if (nextResult._id) {
        this.setState({ result: nextResult, loading: false });
      } else {
        // get result for id
        this._fetchResults(q.id);
      }
    } else {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate() {
    const { result } = this.state;
    const nextResult = get(this.props, 'location.state.result') || {};
    if (nextResult._id !== result._id) {
      this.setState({ result: nextResult });
    }
  }

  componentWillUnmount() {
    pusher.unsubscribe('private-lh');
  }

  _fetchResults = async _id => {
    try {
      const response = await axios.get(
        process.env.GATSBY_API_HOST + '/e1/public/quickcheck/' + _id,
      );
      this.setState({ result: response.data, loading: false });
    } catch (error) {
      console.log('error finding result', error.response);
      this.setState({ loading: false, error: error.response.data.message });
    }
  };

  _getQueryParams = () => {
    return parse(this.props.location.search, { ignoreQueryPrefix: true });
  };

  render() {
    const { loading, result, error } = this.state;
    const { classes } = this.props;

    if (loading) {
      return null;
    }

    let hero = (
      <div className={classes.hero}>
        <Typography variant="subtitle1">
          Haven't checked your website yet?
        </Typography>
        <Typography variant="h2">Test your Website now!</Typography>
      </div>
    );

    if (error) {
      hero = (
        <div className={classes.hero}>
          <h6>{error}</h6>
        </div>
      );
    }

    if (result._id) {
      hero = null;
    }

    return (
      <Fade in>
        <Layout>
          <Grid container justify="center">
            {hero}
          </Grid>
          <div className={classes.formSection}>
            <div className={classes.formContainer}>
              <FormAudit result={result} />
            </div>
          </div>
        </Layout>
      </Fade>
    );
  }
}

export default withRoot(withStyles(styles)(Measure));
