import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-toolbox/lib/card/Card';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Input from 'react-toolbox/lib/input/Input';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Button from 'react-toolbox/lib/button/Button';

import style from './styles';

const todaysDate = new Date(Date.now());
const minimumDate = new Date(todaysDate.setDate(todaysDate.getDate() - 1));

const EnigmaCard = (props) => {
  const { sender, message, date, handleChange, sendMessage, handleEncryptionToggle } = props;
  return (
    <div>
      <Card style={style.container}>
        <div style={style.title}>RIXI</div>
        <Input
          type='text'
          label='Restaurant Name'
          id='sender'
          value={sender}
          icon={<Avatar>{sender[0]}</Avatar>}
          onChange={handleChange}
          required
        />
        <Input
          type='text'
          label='Message to Subscribers'
          id='message'
          value={message}
          hint='Type a message to your subscribers!'
          maxLength={120}
          onChange={handleChange}
          multiline
          required
        />
        <DatePicker
          label='Date of Event'
          minDate={minimumDate}
          id='date'
          autoOk={true}
          value={date}
          onChange={handleChange}
          sundayFirstDayOfWeek
          required
        />
        <CardActions>
          <Button label='SEND' id='send' onClick={sendMessage} />
          {/* <Button label='ENCRYPT' id='encrypt' onClick={handleEncryptionToggle} /> */}
          <Button label='DECRYPT' id='toggle' onClick={handleEncryptionToggle} />
        </CardActions>
      </Card>
    </div>
  );
};

EnigmaCard.propTypes = {
  sender: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.any.isRequired,
  sendMessage: PropTypes.func.isRequired,
  handleEncryptionToggle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EnigmaCard;
