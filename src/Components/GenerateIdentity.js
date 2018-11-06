import React, {Component} from 'react';
import EthCrypto from 'eth-crypto';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  layout: {
    marginTop: 30,
  },
  highlightBox: {
    padding: 10,
    wordWrap: 'break-word',
  },
};


class GenerateIdentity extends Component {

  state = {
    address: '',
    privateKey: '',
    publicKey: '',
    generated: false
  }

  createIdentity = (e) => {
    e.preventDefault();
    const identity = EthCrypto.createIdentity();
    const {address, privateKey, publicKey} = identity;
    this.setState({address, privateKey, publicKey, generated: true});
  }

  render() {
    const {address, privateKey, publicKey, generated} = this.state;
    const {classes} = this.props;
    return (<div className={classes.layout}>
      <Typography type='body1'>If you don't have an Ethereum Identity Click Below</Typography>
      <form onSubmit={this.createIdentity}>
        <Button type='submit'>
          Generate Your Ethereum Credentials
        </Button>
      </form>
      <div className={classes.highlightBox}>
        {
          generated && <ul>
              <li><strong>Address:</strong> {address}</li>
              <li><strong>Private Key:</strong> {privateKey}</li>
              <li><strong>Public Key:</strong> {publicKey}</li>
            </ul>
        }
      </div>
    </div>)
  }
}

export default withStyles(styles)(GenerateIdentity);
