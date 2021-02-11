import PropTypes from 'prop-types'
import React from 'react'
import StateControl from '../baseControls/StateControl'

/**
 * Renders edit and view modes for a control
 * @param {bool} props.editing Is the control in edit mode
 * @param {() => ReactElement} props.viewControl View mode control
 * @param {() => ReactElement)} props.editControl Edit mode control
 * @returns {ReactElement} StateControl element which handles rendering
 */
function DataControl(props) {
  const { editing, viewControl, editControl } = props

  const stateControlMapping = new Map()
  stateControlMapping.set(false, viewControl)
  stateControlMapping.set(true, editControl)

  return (
    <StateControl stateControlMapping={stateControlMapping} state={editing} />
  )
}

DataControl.propTypes = {
  editing: PropTypes.bool.isRequired,
  viewControl: PropTypes.node.isRequired,
  editControl: PropTypes.node.isRequired
}

export default DataControl
