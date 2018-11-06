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

class GrantAccess extends Component {


  render(){
    const {
      onInputChange,
      handleSubmitAccess,
      publicKey,
      address,
      dataHash,
      loading,
      classes
    } = this.props

    return (
      <div>
        <Typography variant='body1' >
          <p>Please fill out information below to give permission to view your data</p>
        </Typography>

        <form onSubmit={handleSubmitAccess}>
          <TextField
            id='publicKeyGranter'
            label='Public Key of Granter'
            required
            value={publicKey.replace(/\s/g, '')}
            onChange={onInputChange('publicKeyGranter')}
            className={classes.space}
            margin='normal'
          /><br/>
          <TextField
            id='publicKeyGrantee'
            label='Public Key of Grantee'
            required
            value={publicKey.replace(/\s/g, '')}
            onChange={onInputChange('publicKeyGrantee')}
            className={classes.space}
            margin='normal'
          /><br/>

          <TextField
            id='address'
            label='Address of Grantee'
            required
            value={publicKey.replace(/\s/g, '')}
            onChange={onInputChange('address')}
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
            Grant Access to Record
          </Button>
        </form><br/>


      </div>
    )
  }
}

export default withStyles(styles)(GrantAccess);
