import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import MainForm from './MainForm';
import Results from './Results';
import { channel } from '../Layout/withPusher';

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
    };
  }

  componentWillUnmount() {
    if (this.listenedId) {
      channel.unbind(this.listenedId);
    }
  }

  // post the url to the api
  // if response has result, redirect to /pageID
  // if response has processing: 1, bind channel to pageID and listen for the result
  _onSubmit = async e => {
    e.preventDefault();
    try {
      const { url } = this.state;

      let resolvedUrl = url;
      if (
        url.lastIndexOf('http://') !== 0 &&
        url.lastIndexOf('https://') !== 0
      ) {
        resolvedUrl = 'https://' + url;
      }
      this.setState({ url: resolvedUrl, pending: true, error: false });
      console.log('url', resolvedUrl);

      const response = await axios.post(
        process.env.GATSBY_API_HOST + '/e1/public/quickcheck',
        {
          url: resolvedUrl,
          location: 'nyc',
        },
      );

      if (response.data.processing) {
        // bind channel
        if (!channel || !channel.subscribed) {
          // throw error
          this.setState({ pending: false, error: 'Socket not open.' });
          return;
        }
        this.listenedId = response.data.pageID;
        channel.bind(response.data.pageID + '', this.listenForResult);
      } else {
        // result received, redirect to /?id=pageID
        this.setState({ pending: false });
        navigate('/measure/?id=' + response.data._id, {
          state: { result: response.data },
        });
      }
    } catch (error) {
      console.log('error2', error.response);
      this.setState({ pending: false, error: error.response.data.message });
    }
  };

  listenForResult = data => {
    console.log('result arrived via pusher', data);
    this.setState({ pending: false });
    navigate('/measure/?id=' + data._id, { state: { result: data } });
  };

  _initialize = () => {
    this.setState({
      results: null,
      pending: false,
      url: '',
    });
    navigate('/measure/', { state: { result: {} } });
  };

  _onChangeInput = e => {
    this.setState({ url: e.target.value });
  };

  render() {
    const { result } = this.props;
    const { url, pending, error } = this.state;
    const { classes } = this.props;

    if (result._id) {
      return <Results data={result} onBack={this._initialize} />;
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
