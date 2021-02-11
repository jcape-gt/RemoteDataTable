import PropTypes from 'prop-types'
import React from 'react'
import DataControl from '../dataControls/DataControl'

/**
 * Renders edit or view controls based on the current state
 * @param {bool} props.editing
 * @param {() => ReactElement} props.viewControl
 * @param {() => ReactElement} props.editControl
 * @returns {ReactElement} The element rendered given the current editing state
 */
function RowStateControl(props) {
  const { editing, viewControl, editControl } = props

  return (
    <DataControl
      editing={editing}
      viewControl={viewControl}
      editControl={editControl}
    />
  )
}

RowStateControl.propTypes = {
  editing: PropTypes.bool.isRequired,
  viewControl: PropTypes.node.isRequired,
  editControl: PropTypes.node.isRequired
}

export default RowStateControl
