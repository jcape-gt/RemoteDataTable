import PropTypes from 'prop-types'
import React from 'react'
import DataControl from './DataControl'
import TextControl from '../baseControls/TextControl'
import { useController } from 'react-hook-form'

/**
 * Renders a text control with view and edit mode
 * @param {object} props.value Control's current data value
 * @param {bool} props.editing Whether control is in edit mode
 * @param {(val) => void} props.onChange Control's value change callback
 * @returns {ReactElement} StateControl element which handles rendering
 */
function DataTextControl(props) {
  const { value, editing, onChange, validation } = props

  return (
    <DataControl
      editing={editing}
      viewControl={value}
      editControl={
        <TextControl
          value={value}
          onChange={onChange}
          validation={validation}
        />
      }
    />
  )
}

DataTextControl.propTypes = {
  value: PropTypes.any.isRequired,
  editing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default DataTextControl
