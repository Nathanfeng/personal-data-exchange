import React, {Component} from 'react';
import GrantAccessTitle from './GrantAccessTitle';
import GrantAccessForm from './GrantAccessForm';


class GrantAccess extends Component {

  state = {
    publicKey: '',
    dataHash: '',
    address: '',
    msg: false,
    errorMessage: false,
    loading: false
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  handleSubmitAccess = (e) => {
    e.preventDefault();
    
  }

  render(){
    const {
      publicKey,
      dataHash,
      address,
      msg,
      errorMessage,
      loading
    } = this.state

    return (
      <div>
        <GrantAccessTitle/>
        <GrantAccessForm
          publicKey={publicKey}
          dataHash={dataHash}
          address={address}
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
