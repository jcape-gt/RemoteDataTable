import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { MenuItem, Select, FormHelperText } from '@material-ui/core'

function validate(value, validator) {
  console.log(`value: ${value}`)
  console.log(validator)
  return validator.required && value === validator.defaultValue
}

/**
 * An editable select/dropdown control
 * @param {object} props.value - The displayed value
 * @param {() => {}} props.onChange - On selected item change callback
 * @param {array} props.items - List of items for selection
 * @returns {ReactElement} The element to be rendered
 */
function SelectControl(props) {
  const { value, onChange, items, validation } = props
  const [editValue, setNewValue] = useState({ value: value, error: false })

  const onLocalChange = (event) => {
    const newValue = {
      value: event.target.value,
      error: validate(event.target.value, validation)
    }
    setNewValue(newValue)
    onChange(event.target.value)
  }

  return (
    <React.Fragment>
      <Select
        value={editValue.value}
        onChange={(event) => onLocalChange(event)}
        fullWidth
        error={editValue.error}
      >
        {items.map((item) => {
          return (
            <MenuItem key={item.key} value={item.key}>
              {item.value}
            </MenuItem>
          )
        })}
      </Select>
      {editValue.error && (
        <FormHelperText error>{validation.message}</FormHelperText>
      )}
    </React.Fragment>
  )
}

SelectControl.defaultProps = {
  validation: { required: false, message: '', defaultValue: '' }
}

SelectControl.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
}

export default SelectControl
