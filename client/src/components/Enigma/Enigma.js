import React from 'react';
import createHistory from 'history/createBrowserHistory';

/* Views */
import EncryptionModal from '../../views/EncryptionModal';
import ErrorModal from '../../views/ErrorModal';
import EnigmaCard from '../../views/EnigmaCard';
import Passphrase from '../../views/Passphrase';

import APIactions from '../../actions/APIactions';
import dispatcher from '../../AppDispatcher';

const history = createHistory();

class Enigma extends React.Component {
  constructor() {
    super();

    this.state = {
      sender: '',
      message: '',
      date: '',
      passphrase: '',
      dialogActive: false,
      encryptedMessage: '',
      errorMessage: '',
      errorActive: false,
    };

    this.handlePassphrase = this.handlePassphrase.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEncryptionToggle = this.handleEncryptionToggle.bind(this);
    this.handleErrorToggle = this.handleErrorToggle.bind(this);
    this.onAction = this.onAction.bind(this);
  }

  componentWillMount() {
    this.dispatcherRef = dispatcher.register(this.onAction);
    const location = this.props.location.pathname;
    const currPassphrase = location.split('/');
    if (currPassphrase.length === 2) {
      this.setState({ passphrase: currPassphrase[1] });
    }
  }

  onAction(action) {
    switch (action.type) {
      case 'RECEIVE_ENCRYPTED_MESSAGE':
        this.setState({
          encryptedMessage: action.payload,
        });
        break;
      case 'RECEIVE_DECRYPTION_SUCCESS':
        this.setState({
          message: action.payload.message,
          sender: action.payload.sender,
          date: new Date(action.payload.expirationDate),
        });
        break;
      case 'RECEIEVE_DECRYPTION_ERROR':
        if (action.payload === 'date') {
          this.setState({
            errorMessage: 'The message has expired.',
            errorActive: true,
          });
        } else {
          this.setState({
            errorMessage: `The ${action.payload} is invalid!`,
            errorActive: true,
          });
        }
        break;
      default:
        this.setState({
          encryptedMessage: '',
        });
    }
  }

  handleChange(val, e) {
    let type = '';
    if (e === undefined) {
      type = 'date';
    } else {
      type = e.target.id;
    }
    this.setState({ [type]: val });
  }

  handlePassphrase(passphrase) {
    history.push(`/${passphrase}`);
    this.setState({ passphrase });
  }

  handleErrorToggle() {
    this.setState({ errorActive: !this.state.errorActive });
  }

  handleEncryptionToggle(e) {
    const id = e.target.id;
    const { sender, message, date, encryptedMessage } = this.state;
    switch (id) {
      case 'encrypt':
        if (sender === '' || message === '' || date === '') {
          this.setState({
            errorMessage: 'Fill in all required fields!',
            errorActive: true,
          });
        } else {
          this.sendEncryptionRequest();
          this.setState({ dialogActive: !this.state.dialogActive });
        }
        break;
      case 'decrypt':
        if (encryptedMessage === '') {
          this.setState({
            errorMessage: 'Encrypted Message cannot be empty!',
            errorActive: true,
          });
        } else {
          this.sendDecryptionRequest();
          this.setState({ dialogActive: !this.state.dialogActive });
        }
        break;
      case 'toggle':
        this.setState({ dialogActive: !this.state.dialogActive });
        break;
      default:
    }
  }

  sendEncryptionRequest() {
    const encryptionPackage = {
      sender: this.state.sender,
      message: this.state.message,
      expirationDate: this.state.date,
      key: this.state.passphrase,
    };
    this.setState({
      encryptedMessage: 'Encrypting...',
    });
    APIactions.encryptMessage(encryptionPackage);
  }

  sendDecryptionRequest() {
    const decryptionPackage = {
      currentDate: Date.now(),
      key: this.state.passphrase,
      encryptedMessage: this.state.encryptedMessage,
    };
    APIactions.decryptMessage(decryptionPackage);
  }

  render() {
    return (
      <div>
        <EnigmaCard
          sender={this.state.sender}
          message={this.state.message}
          date={this.state.date}
          handleEncryptionToggle={this.handleEncryptionToggle}
          handleChange={this.handleChange}
        />
        <EncryptionModal
          encryptedMessage={this.state.encryptedMessage}
          handleEncryptionToggle={this.handleEncryptionToggle}
          handleChange={this.handleChange}
          active={this.state.dialogActive}
        />
        <Passphrase
          passphrase={this.state.passphrase}
          handlePassphrase={this.handlePassphrase}
        />
        <ErrorModal
          errorMessage={this.state.errorMessage}
          handleErrorToggle={this.handleErrorToggle}
          active={this.state.errorActive}
        />
      </div>
    );
  }
}

export default Enigma;
