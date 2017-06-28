import React from 'react';
import PropTypes from 'prop-types';
import generatePassword from 'password-generator';
import copy from 'copy-to-clipboard';

import style from './styles';

class Passphrase extends React.Component {
  constructor() {
    super();

    this.state = {
      passphrase: '',
    };

    this.createNewPassphrase = this.createNewPassphrase.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  componentWillMount() {
    if (this.props.passphrase !== '') {
      this.setState({ passphrase: this.props.passphrase });
    } else {
      this.createNewPassphrase();
    }
  }

  createNewPassphrase(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    const passphrase = generatePassword(5, false);
    this.props.handlePassphrase(passphrase);
    this.setState({ passphrase });
  }

  handleChange(name, value) {
    this.setState({ ...this.state, [name]: value });
  }

  copyToClipboard(e) {
    const { passphrase } = this.state;
    e.preventDefault();
    copy(passphrase);
  }

  render() {
    return (
      <div style={style.container}>
        Your Passphrase - <a href='' style={style.link} onClick={this.copyToClipboard}>{this.state.passphrase}</a>
        <br />
        <br />
        <a href='' style={style.link} onClick={this.createNewPassphrase}>
          Generate new Passphrase
        </a>
      </div>
    );
  }
}

Passphrase.propTypes = {
  passphrase: PropTypes.string.isRequired,
  handlePassphrase: PropTypes.func.isRequired,
};

export default Passphrase;
