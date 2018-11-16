import React from 'react';
import { Link } from 'gatsby';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
        <Typography variant="h6">
          <Link to="/">WebsiteSpeed</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(TopNav);
