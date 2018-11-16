import React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  },
  palette: {
    primary: {
      main: blue[300],
    },
  },
  shape: {
    borderRadius: 2,
  },
});

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#fff',
    },
  },
});

function withMuiTheme(Component) {
  function fn(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return withStyles(styles)(fn);
}

export default withMuiTheme;
