import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import MainForm from './MainForm';
import Results from './Results';

const styles = theme => ({
  textField: {
    backgroundColor: '#fff',
  },
  disabled: {
    //backgroundColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#f8f9fa',
  },
  button: {
    height: '100%',
    boxShadow: 'none',
  },
});
class FormAudit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      error: '',
      pending: false,
      results: null,
      results2: {
        url: 'https://generalstudios.com',
        screenshot: '',
        perf: 0.3,
        pwa: 0.6,
        acc: 0.3,
        bp: 0.3,
        seo: 0.3,
        totalSize: 113873.29,
        screenshot: '',
      },
    };
  }

  _onSubmit = e => {
    e.preventDefault();
    const { url } = this.state;
    let resolvedUrl = url;
    if (
      url.lastIndexOf('http://') === -1 &&
      url.lastIndexOf('https://') === -1
    ) {
      resolvedUrl = 'https://' + url;
    }
    this.setState({ url: resolvedUrl, pending: true, error: false });
    console.log('url', resolvedUrl);
    const apiURL =
      process.env.NODE_ENV === 'production'
        ? 'https://api.websitespeed.co/e1/public/quickcheck'
        : 'http://localhost:4040/e1/public/quickcheck';
    axios
      .post(apiURL, { url: resolvedUrl, location: 'nyc' })
      .then(res => {
        console.log('res', res);
        this.setState({ results: res.data, pending: false });
      })
      .catch(err => {
        console.log('err', err, err.message);
        this.setState({ error: err.response.data.message, pending: false });
      });
  };

  _initialize = () => {
    this.setState({
      results: null,
      pending: false,
      url: '',
    });
  };

  _onChangeInput = e => {
    this.setState({ url: e.target.value });
  };

  render() {
    const { url, pending, results, error } = this.state;
    const { classes } = this.props;

    if (results) {
      return <Results data={results} onBack={this._initialize} />;
    }

    return (
      <MainForm
        onSubmit={this._onSubmit}
        url={url}
        onChange={this._onChangeInput}
        pending={pending}
        classes={classes}
        error={error}
      />
    );
  }
}

export default withStyles(styles)(FormAudit);
