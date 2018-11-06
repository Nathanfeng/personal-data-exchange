import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  space: {
    marginRight: theme.spacing.unit * 5,
  },
  text: {
    marginTop: 20,
  }
});
class GrantAccess extends Component {

  render(){
    return (
      <div>
        <Typography variant='title' >
          Grant Access to Your Information
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(GrantAccess);
