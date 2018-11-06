import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme) => ({
  space: {
    marginRight: theme.spacing.unit * 5,
  },
  text: {
    marginTop: 20,
  }
});

const UploadTitle = (props) => {
  return (
    <div>
      <Typography variant='title'>
        Personal Data Exchange
      </Typography> <br/>
      <Typography variant='body1'>
        Fill Out Your Information Below and Upload your Personal Information to Linnia
      </Typography>
    </div>
  )
}

export default withStyles(styles)(UploadTitle);
