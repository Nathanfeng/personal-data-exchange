import React, {Component} from 'react';
import RetrieveForm from './RetrieveForm';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {decrypt} from '../utils/encrypt';
import Linnia from '@linniaprotocol/linnia-js';
import IPFS from 'ipfs-mini';
import config from '../utils/config';
import web3 from '../utils/web3';

const hubAddress = config.LINNIA_HUB_ADDRESS;
const protocol = config.LINNIA_IPFS_PROTOCOL;
const port = config.LINNIA_IPFS_PORT;
const host = config.LINNIA_IPFS_HOST;

const ipfs = new IPFS({ host: host, port: port, protocol: protocol });
const linnia = new Linnia(web3, ipfs, { hubAddress });


const styles = (theme) => ({
  space: {
    marginRight: theme.spacing.unit * 5,
  },
  text: {
    marginTop: 20,
  },
});

class Retrieve extends Component {

  state = {
    privateKey: '',
    dataHash: '',
    decryptedIPFS: false,
    msg: false,
    errorMessage: false,
    loading: false
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  handleSubmitRetrieve = async (e) => {
    e.preventDefault();
    const userAddr = await web3.eth.getAccounts();
    const linniaRecord = await linnia.getRecord(this.state.dataHash);
    const ipfsLink = linniaRecord.dataUri;

    ipfs.cat(ipfsLink, async (err, ipfsRes) => {
      if(err) {
        this.setState({errorMessage: err.message});
      } else {
        const encrypted = ipfsRes;
        try {
          const decryptedIPFS = await decrypt(this.state.privateKey, encrypted);
          this.setState({decryptedIPFS});
        } catch (e) {
          this.setState({errorMessage: "Error in Decrypting Data, check your private key"})
        }
      }
    })
  }

  render() {

    const {
      privateKey,
      dataHash,
      decryptedIPFS,
      msg,
      errorMessage,
      loading
    } = this.state

    let jsonInfo = JSON.parse(decryptedIPFS);
    return (
      <div>
        <Typography variant='body1' >
          <h1>Retrieve Information</h1>
        </Typography>

        <RetrieveForm
          privateKey={privateKey}
          dataHash={dataHash}
          msg={msg}
          errorMessage={errorMessage}
          loading={loading}
          onInputChange={this.onInputChange}
          handleSubmit={this.handleSubmitRetrieve}
        />

      {
        decryptedIPFS && (
          <Typography variant='body1'>
            <ul>
              <li>Name: {jsonInfo.Name}</li>
              <li>Phone Number: {jsonInfo.PhoneNumber}</li>
            </ul>
          </Typography>
        )
      }

      </div>
    )
  }
}

export default withStyles(styles)(Retrieve);
