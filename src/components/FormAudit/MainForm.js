import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import { IoMdGlobe } from 'react-icons/io';
import cn from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';

const MainForm = ({ onSubmit, url, onChange, pending, error, classes }) => {
  const clTextField = cn(classes.textField, {
    [classes.disabled]: pending,
  });

  const btnText = !pending ? (
    'Run Audit'
  ) : (
    <>
      <CircularProgress
        variant="indeterminate"
        color="inherit"
        thickness={2}
        size={32}
      />
      <span style={{ marginLeft: 4 }}>Running audit...</span>
    </>
  );

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={24}>
        <Grid item xs>
          <TextField
            value={url}
            placeholder="https://"
            label="Your Awesome Website"
            variant="outlined"
            className={clTextField}
            fullWidth
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Icon color="disabled">
                    <IoMdGlobe />
                  </Icon>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            disabled={pending}
            className={classes.button}
          >
            {btnText}
          </Button>
        </Grid>
      </Grid>
      {error && (
        <FormHelperText className="text-danger">{error}</FormHelperText>
      )}
    </form>
  );
};

export default MainForm;
