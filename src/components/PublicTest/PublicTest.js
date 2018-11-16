import React, { Component } from 'react';
import isURL from 'validator/lib/isURL';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

import MainForm from './MainForm';
import Processing from './Processing';
import Results from './Results';

class PublicTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      http: 'https://',
      url: '',
      results: { id: 'here' },
      error: '',
    };
  }

  _initialize = () => {
    this.setState({
      pending: false,
      url: '',
      results: '',
      error: '',
    });
  };

  _onSubmit = e => {
    e.preventDefault();
    const { http, url } = this.state;

    let cleanURL = url.trim();
    if (cleanURL.charAt(cleanURL.length - 1) === '/') {
      cleanURL = cleanURL.slice(0, -1);
    }
    if (cleanURL.split('#').length > 1) {
      this.setState({ error: 'URL must not have # in it.' });
      return;
    }
    const postURL = http + cleanURL;
    if (!isURL(postURL)) {
      this.setState({ error: 'Invalid URL.' });
      return;
    }
    this.setState({ error: '', url: cleanURL, pending: true });

    axios
      .post('https://test-nyc.websitespeed.co' + '/api/public/quickcheck', {
        url: postURL,
      })
      .then(res => {
        this.setState({ results: res.data });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  _onChangeSelect = e => {
    this.setState({ http: e.target.value });
  };

  _onChangeInput = e => {
    this.setState({ url: e.target.value });
  };

  render() {
    const { pending, results, http, url, error } = this.state;
    let content = null;

    if (pending) {
      content = results ? (
        <Results onBack={this._initialize} data={results} url={http + url} />
      ) : (
        <Processing url={http + url} error={error} onBack={this._initialize} />
      );
    } else {
      content = (
        <MainForm
          http={http}
          url={url}
          onSubmit={this._onSubmit}
          onChangeSelect={this._onChangeSelect}
          onChangeInput={this._onChangeInput}
          error={error}
        />
      );
    }

    return (
      <div className="app-container d-flex justify-content-center align-items-stretch position-relative">
        <div className="align-self-center">{content}</div>
      </div>
    );
  }
}

export default PublicTest;
