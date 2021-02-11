import PropTypes from 'prop-types';
import React from 'react';
import DataControl from './DataControl';
import DateControl from '../baseControls/DateControl';

/**
 * A date control with view/edit display modes
 * @param {object} props.value The displayed date value 
 * @param {bool} props.editing Is the control in view or edit mode
 * @param {() => {}} props.onChange Callback on date value change
 * @returns {ReactElement} The view or edit control to be rendered
 */
function DataDateControl(props) {
  const {value, editing, onChange} = props;

  return (
    <DataControl 
      editing={editing}
      viewControl={value}
      editControl={<DateControl value={value} onChange={onChange} />}
    />
  )
}

DataDateControl.propTypes = {
  value: PropTypes.any.isRequired,
  editing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DataDateControl;
