import PropTypes from 'prop-types';
import React from 'react';
import DataControl from './DataControl';
import TextControl from '../baseControls/TextControl';

/**
 * Renders a text control with view and edit mode
 * @param {object} props.value Control's current data value 
 * @param {bool} props.editing Whether control is in edit mode
 * @param {(val) => void} props.onChange Control's value change callback
 * @returns {ReactElement} StateControl element which handles rendering 
 */
function DataTextControl(props) {
  const {value, editing, onChange} = props;
  
  return (
    <DataControl 
      editing={editing}
      viewControl={(value)}
      editControl={(<TextControl value={value} onChange={onChange} />)}
    />
  )
}

DataTextControl.propTypes = {
  value: PropTypes.any.isRequired,
  editing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DataTextControl;
