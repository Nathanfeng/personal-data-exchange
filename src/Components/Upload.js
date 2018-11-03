import React, {Component} from 'react';
import UploadForm from './UploadForm';
import UploadTitle from './UploadTitle';



class Upload extends Component {
  state = {
    privateKey: "",
    name: "",
    phoneNumber: ""
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  recordData = () => {

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const privateKey = event.target.elements.privateKey.value;
    const name = event.target.elements.name.value;
    const phoneNumber = event.target.elements.phoneNumber.value;
    this.recordData(privateKey, name, phoneNumber);
  }

  render(){
    const {phoneNumber, name, privateKey} = this.state

    return (
      <div>
        <UploadTitle/>
        <UploadForm
          privateKey={privateKey}
          name={name}
          phoneNumber={phoneNumber}
          onInputChange={this.onInputChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default Upload;
