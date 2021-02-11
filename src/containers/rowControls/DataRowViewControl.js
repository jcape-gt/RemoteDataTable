import PropTypes from 'prop-types';
import React from 'react';
import {Button} from '@material-ui/core';

/**
 * A control containing row actions displayed when row is in view mode
 * @param {() => {}} props.onEditClick
 * @returns {ReactElement} The element to be rendered
 */
function DataRowViewControl(props) {
  const {onEditClick} = props;

  return (
    <Button variant="outlined" onClick={(e) => {onEditClick()}}>
        Edit
    </Button> 
  )
}

DataRowViewControl.propTypes = {
  onEditClick: PropTypes.func.isRequired
}

export default DataRowViewControl;