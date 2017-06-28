import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'react-toolbox/lib/dialog/Dialog';

const ErrorModal = (props) => {
  const { errorMessage, active, handleErrorToggle } = props;
  const actions = [
    { label: 'CLOSE', id: 'toggle', onClick: handleErrorToggle },
  ];
  return (
    <Dialog
      actions={actions}
      active={active}
      onEscKeyDown={handleErrorToggle}
      onOverlayClick={handleErrorToggle}
      title='Error'
    >
      {errorMessage}
    </Dialog>
  );
};

ErrorModal.propTypes = {
  active: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleErrorToggle: PropTypes.func.isRequired,
};

export default ErrorModal;
