import PropTypes from 'prop-types'
import React from 'react'
import { Button } from '@material-ui/core'

/**
 * A control containing row actions displayed when row is in edit mode
 * @param {() => {}} props.onSaveClick
 * @param {() => {}} props.onCancelClick
 * @returns {ReactElement} The element to be rendered
 */
function DataRowEditControl(props) {
  const { onSaveClick, onCancelClick } = props

  return (
    <div>
      <Button
        variant='outlined'
        color='primary'
        onClick={(e) => {
          onSaveClick()
        }}
      >
        Save
      </Button>

      <Button
        variant='outlined'
        color='secondary'
        onClick={(e) => {
          onCancelClick()
        }}
      >
        Cancel
      </Button>
    </div>
  )
}

DataRowEditControl.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired
}

export default DataRowEditControl
