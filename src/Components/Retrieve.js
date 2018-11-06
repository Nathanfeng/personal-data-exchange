import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = (theme) => ({
  space: {
    marginRight: theme.spacing.unit * 5,
  },
  text: {
    marginTop: 20,
  },
});

class Retrieve extends Component {


  render() {
    return (
      <div>
        <Typography variant='body1' >
          <h1>Retrieve Information</h1>
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Retrieve);
