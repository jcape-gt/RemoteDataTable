import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

/**
 * An editable text control
 * @param {object} props.value - The displayed text value
 * @param {() => {}} props.onChange - On text change callback
 * @returns {ReactElement} The element to be rendered
 */
function TextControl(props) {
  const { value, onChange } = props
  const [editValue, setNewValue] = useState(value)

  const onLocalChange = (value) => {
    setNewValue(value)
    onChange(value)
  }

  return (
    <TextField
      value={editValue}
      onChange={(event) => onLocalChange(event.target.value)}
      fullWidth
    />
  )
}

TextControl.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired
}

export default TextControl
