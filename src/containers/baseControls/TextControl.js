import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    console.log(`TextControl ${editValue} mounted`)

    return () => {
      console.log(`TextControl ${editValue} unmounted`)
    }
  })

  const onLocalChange = (value) => {
    console.log(`onchange value: ${value}`)
    setNewValue(value)
    onChange(value)
    console.log(`edit value: ${editValue}`)
  }

  console.log(`Text control with value: ${editValue}`)
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
