import React, {Component} from 'react';
import {encrypt} from '../utils/encrypt';
import Linnia from '@linniaprotocol/linnia-js';
import IPFS from 'ipfs-mini';
import config from '../utils/config';
import web3 from '../utils/web3';
//files
import UploadForm from './UploadForm';
import UploadTitle from './UploadTitle';
import GenerateIdentity from './GenerateIdentity';


const hubAddress = config.LINNIA_HUB_ADDRESS;
const protocol = config.LINNIA_IPFS_PROTOCOL;
const port = config.LINNIA_IPFS_PORT;
const host = config.LINNIA_IPFS_HOST;

const ipfs = new IPFS({ host: host, port: port, protocol: protocol });
const linnia = new Linnia(web3, ipfs, { hubAddress });


class Upload extends Component {
  state = {
    publicKey: "",
    name: "",
    phoneNumber: "",
    errorMessage: false,
    loading: "false",
    msg: false
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  addRecordToIPFS = async() => {
    let encrypted, ipfsRecord;
    const {phoneNumber, name} = this.state;

    const data = {
      'Name': name,
      'PhoneNumber': phoneNumber
    };

    this.setState({ loading: "true" });

    try {
      encrypted = await encrypt(this.state.publicKey, JSON.stringify(data));
    } catch (err) {
      this.setState({ errorMessage: err.message });
      return;
    }

    try {
      ipfsRecord = await new Promise((resolve, reject) => {
        ipfs.add(encrypted, (err, ipfsRed) => {
          err ? reject(err) : resolve(ipfsRed)
        })
      })
    } catch(err){
      this.setState({ errorMessage: err.message });
      return;
    }

    return ipfsRecord;
  }

  addRecordToLinnia = async () => {
    const dataUri = await this.addRecordToIPFS();
    const accounts = await web3.eth.getAccounts();
    const dataHash = await linnia.web3.utils.sha3(dataUri);
    const metadata = this.state.publicKey;

    try {
      const { records } = await linnia.getContractInstances();
      await records.addRecord(dataHash, metadata, dataUri, { from: accounts[0] });
      this.setState({ msg: `Your info was added to Linnia! This is the associated data hash: ${dataHash}` });
    } catch (err) {
      this.setState({ errorMessage: err.message });
      return;
    }
  }


  handleSubmit = async (event) => {
    event.preventDefault();
    await this.addRecordToLinnia();
  }

  render(){
    const {
      phoneNumber,
      name,
      publicKey,
      errorMessage,
      loading,
      msg
    } = this.state

    return (
      <div>
        <UploadTitle/>
        <UploadForm
          publicKey={publicKey}
          name={name}
          phoneNumber={phoneNumber}
          msg={msg}
          errorMessage={errorMessage}
          loading={loading}
          onInputChange={this.onInputChange}
          handleSubmit={this.handleSubmit}
        />
        <GenerateIdentity/>
      </div>
    )
  }
}

export default Upload;
