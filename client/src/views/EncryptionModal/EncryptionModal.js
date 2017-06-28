import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';

const EncryptionModal = (props) => {
  const { active, handleEncryptionToggle, handleChange, encryptedMessage } = props;
  const actions = [
    { label: 'CLOSE', id: 'toggle', onClick: handleEncryptionToggle },
    { label: 'DECRYPT', id: 'decrypt', onClick: handleEncryptionToggle },
  ];
  return (
    <Dialog
      actions={actions}
      active={active}
      onEscKeyDown={handleEncryptionToggle}
      onOverlayClick={handleEncryptionToggle}
      title='De/Encrypt'
    >
      <Input
        type='text'
        label='Message'
        value={encryptedMessage}
        id='encryptedMessage'
        multiline
        required
        onChange={handleChange}
      />
    </Dialog>
  );
};

EncryptionModal.propTypes = {
  active: PropTypes.bool.isRequired,
  encryptedMessage: PropTypes.string.isRequired,
  handleEncryptionToggle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EncryptionModal;
