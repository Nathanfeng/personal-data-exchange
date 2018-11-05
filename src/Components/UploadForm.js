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

  render() {
    const {
      classes,
      onInputChange,
      handleSubmit,
      publicKey,
      phoneNumber,
      name
    } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            id='publicKey'
            label='Public Key'
            required
            value={publicKey.replace(/\s/g, '')}
            onChange={onInputChange('publicKey')}
            className={classes.space}
            margin='normal'
          /><br/>
          <TextField
            id='name'
            label='First Name'
            required
            value={name.replace(/\s/g, '')}
            onChange={onInputChange('name')}
            className={classes.space}
            margin='normal'
          /> <br/>
          <TextField
            id='phoneNumber'
            label='Phone Number'
            required
            value={phoneNumber.replace(/\s/g, '')}
            onChange={onInputChange('phoneNumber')}
            className={classes.space}
            margin='normal'
          /><br/>
          <Button type='submit'>
            Submit Your Information
          </Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(UploadForm);
