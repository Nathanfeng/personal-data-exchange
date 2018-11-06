import React, {Component} from 'react';
import GrantAccessTitle from './GrantAccessTitle';
import GrantAccessForm from './GrantAccessForm';


class GrantAccess extends Component {

  state = {
    privateKey: '',
    dataHash: '',
    msg: false,
    errorMessage: false,
    loading: false
  }

  onInputChange = () => {

  }

  handleSubmitAccess = () => {

  }

  render(){
    const {
      privateKey,
      dataHash,
      msg,
      errorMessage,
      loading
    } = this.state

    return (
      <div>
        <GrantAccessTitle/>
        <GrantAccessForm
          privateKey={privateKey}
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
