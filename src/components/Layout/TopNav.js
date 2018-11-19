import React from 'react';
import { Link } from 'gatsby';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    backgroundColor: '#f8f9fa',
  },
});

const TopNav = ({ classes }) => {
  return (
    <AppBar
      color="default"
      elevation={0}
      position="relative"
      className={classes.root}
    >
      <Toolbar>
        <Button component={Link} to="/">
          WebsiteSpeed
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(TopNav);
