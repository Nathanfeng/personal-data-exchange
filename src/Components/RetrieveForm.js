import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  space: {
    marginRight: theme.spacing.unit * 5,
  },
  text: {
    marginTop: 20,
  }
});

class RetrieveForm extends Component {

  render(){
    const {
      onInputChange,
      handleSubmitRetrieve,
      privateKey,
      dataHash,
      loading,
      classes
    } = this.props

    return (
      <div>
        <Typography variant='body1' >
          Please fill out information below to retrieve information from Linnia
        </Typography>

        <form onSubmit={handleSubmitRetrieve}>
          <TextField
            id='privateKey'
            label='Private Key'
            required
            value={privateKey.replace(/\s/g, '')}
            onChange={onInputChange('privateKey')}
            className={classes.space}
            margin='normal'
          /><br/>

          <TextField
            id='dataHash'
            label='dataHash'
            required
            value={dataHash.replace(/\s/g, '')}
            onChange={onInputChange('dataHash')}
            className={classes.space}
            margin='normal'
          /> <br/>

          <Button type='submit' loading={loading}>
            Retrieve Record
          </Button>
        </form><br/>


      </div>
    )
  }
}

export default withStyles(styles)(RetrieveForm);
