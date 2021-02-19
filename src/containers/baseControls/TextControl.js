import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

function validate(value, validator) {
  return validator.required && !value
}

/**
 * An editable text control
 * @param {object} props.value - The displayed text value
 * @param {() => {}} props.onChange - On text change callback
 * @returns {ReactElement} The element to be rendered
 */
function TextControl(props) {
  const { value, onChange, validation, ...childProps } = props
  const [editValue, setNewValue] = useState({ value: value, error: false })

  const onLocalChange = (value) => {
    const newValue = {
      value: value,
      error: validate(value, validation)
    }
    setNewValue(newValue)
    onChange(value)
  }

  return (
    <TextField
      value={editValue.value}
      onChange={(event) => onLocalChange(event.target.value)}
      fullWidth
      error={editValue.error}
      helperText={editValue.error ? validation.message : null}
      {...childProps}
    />
  )
}

TextControl.defaultProps = {
  validation: { required: false, message: '' }
}

TextControl.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired
}

export default TextControl
