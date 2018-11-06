import React, {Component} from 'react';
import GrantAccessTitle from './GrantAccessTitle';
import GrantAccessForm from './GrantAccessForm';
import {encrypt, decrypt} from '../utils/encrypt';
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


class GrantAccess extends Component {

  state = {
    granterPrivateKey: '',
    granteePublicKey: '',
    granteeAddress: '',
    decryptedIPFS: '',
    dataHash: '',
    msg: false,
    errorMessage: false,
    loading: "false"
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  getDecryptedData = async () => {
    const linniaRecord = await linnia.getRecord(this.state.dataHash);
    const ipfsLink = linniaRecord.dataUri;
    let decryptedIPFS;

    ipfs.cat(ipfsLink, async (err, ipfsRes) => {
      if(err) {
        this.setState({errorMessage: err.message});
      } else {
        let encrypted = ipfsRes;
        try {
          const decryptedIPFS = await decrypt(this.state.privateKey, encrypted);
          this.setState({decryptedIPFS});
        } catch (e) {
          this.setState({errorMessage: "Error in Decrypting Data, check your private key"})
        }
      }
    })

    return decryptedIPFS;
  }

  addDecryptedDataToIPFS = async () => {
    const data = await this.getDecryptedData();
    let encrypted;
    let ipfsRecord;

    try{
      encrypted = await encrypt(this.state.granteePublicKey, JSON.stringify(data));
    }catch(err){
      this.setState({ errorMessage: err.message });
      return;
    }

    try{
      ipfsRecord = await new Promise((resolve, reject) => {
        ipfs.add(encrypted, (err, ipfsRed) => {
          err ? reject(err) : resolve(ipfsRed)
        })
      })
    }catch(err){
      this.setState({ errorMessage: err.message });
      return;
    }

    return ipfsRecord;
  }

  grantPermissionsOnLinnia = async () => {
    this.setState({ loading: "false" });
    const {dataHash, granteeAddress} = this.state
    const dataUri = await this.addDecryptedDataToIPFS;
    const accounts = await web3.eth.getAccounts();
    try {
      const { permissions } = await linnia.getContractInstances();
      await permissions.grantAccess(dataHash, granteeAddress, dataUri, { from: accounts[0] });

      this.setState({ msg: `successfully given permission to ${granteeAddress}`});
    }catch(err){
      this.setState({ errorMessage: err.message });
      return;
    }

    this.setState({ loading: "false" });
  }

  handleSubmitAccess = async (e) => {
    e.preventDefault();
    await this.grantPermissionsOnLinnia();
  }

  render(){
    const {
      granteePublicKey,
      granterPrivateKey,
      granteeAddress,
      dataHash,
      msg,
      errorMessage,
      loading
    } = this.state

    return (
      <div>
        <GrantAccessTitle/>
        <GrantAccessForm
          granterPrivateKey={granterPrivateKey}
          granteePublicKey={granteePublicKey}
          granteeAddress={granteeAddress}
          dataHash={dataHash}
          msg={msg}
          errorMessage={errorMessage}
          loading={loading}
          onInputChange={this.onInputChange}
          handleSubmit={this.handleSubmitAccess}
        />
      </div>
    )
  }
}

export default GrantAccess;
