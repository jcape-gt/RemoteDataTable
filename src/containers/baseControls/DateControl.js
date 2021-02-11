import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';

/**
 * An editable date control 
 * @param {object} props.value - The displayed date value
 * @param {() => {}} props.onChange - On date change callback
 * @returns {ReactElement} The element to be rendered
 */
function DateControl(props) {
  const {value, onChange} = props;
  const [editValue, setNewValue] = useState(value);

  const onLocalChange = (value) => {
    setNewValue(value);
    onChange(value);
  }

  return (
    <KeyboardDatePicker 
      format='MM/dd/yyyy' 
      value={editValue} 
      onChange={(date, value) => onLocalChange(value)} 
      fullWidth={true} 
    />
  )
}

DateControl.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DateControl;
