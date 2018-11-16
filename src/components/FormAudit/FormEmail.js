import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  root: {
    maxWidth: 720,
    width: '100%',
    marginTop: 180,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    height: '100%',
    boxShadow: 'none',
  },
});

class FormEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: false,
      email: '',
      error: '',
      success: false,
    };
  }
  _onSubmit = async e => {
    try {
      e.preventDefault();
      const { email } = this.state;
      const { id } = this.props;
      const apiURL =
        process.env.NODE_ENV === 'production'
          ? 'https://api.websitespeed.co/e1/public/email'
          : 'http://localhost:4040/e1/public/email';

      this.setState({ pending: true, error: '' });
      axios
        .post(apiURL, { email, id })
        .then(res => {
          this.setState({ success: true, pending: false });
        })
        .catch(err => {
          this.setState({ error: err.message, pending: false });
        });
    } catch (error) {
      this.setState({ error: error.message, pending: false });
    }
  };
  _onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  render() {
    const { email, pending, error, success } = this.state;
    const { classes } = this.props;

    let btnText = 'Email Results';
    if (success) {
      btnText = 'Results sent.';
    }
    if (pending) {
      btnText = 'Sending...';
    }

    return (
      <div className={classes.root}>
        <form onSubmit={this._onSubmit} style={{ marginTop: 20 }}>
          <Grid container spacing={16}>
            <Grid item xs>
              <TextField
                value={email}
                placeholder="Your Email"
                label="Your Email"
                variant="outlined"
                onChange={this._onChangeEmail}
                fullWidth
                disabled={pending || success}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
                disabled={pending || success}
              >
                {btnText}
              </Button>
            </Grid>
          </Grid>
          {error && (
            <FormHelperText className="text-danger">{error}</FormHelperText>
          )}
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(FormEmail);
