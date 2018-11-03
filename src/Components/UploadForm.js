import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  space: {
    marginRight: theme.spacing.unit * 5,
  },
  text: {
    marginTop: 20,
  },
});

class UploadForm extends Component {



  handleSubmit = () => {

  }

  componentDidMount = async () => {

  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            // id='privateKey'
            label='Private Key'
            required
            // value={privateKey.replace(/\s/g, '')}
            // onChange={onInputChange}
            className={classes.space}
            margin='normal'
          /><br/>
          <TextField
            // id='privateKey'
            label='Phone Number'
            required
            // value={privateKey.replace(/\s/g, '')}
            // onChange={onInputChange}
            className={classes.space}
            margin='normal'
          /><br/>
          <TextField
            // id='privateKey'
            label='Email'
            required
            // value={privateKey.replace(/\s/g, '')}
            // onChange={onInputChange}
            className={classes.space}
            margin='normal'
          />

        <br/>
          <Button type='submit'>
            Submit Your Information
          </Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(UploadForm);
