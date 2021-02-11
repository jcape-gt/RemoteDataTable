import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { MenuItem, Select } from '@material-ui/core'

/**
 * An editable select/dropdown control
 * @param {object} props.value - The displayed value
 * @param {() => {}} props.onChange - On selected item change callback
 * @param {array} props.items - List of items for selection
 * @returns {ReactElement} The element to be rendered
 */
function SelectControl(props) {
  const { value, onChange, items } = props
  const [editValue, setNewValue] = useState(value)

  const onLocalChange = (event) => {
    console.log(event.target.value)
    setNewValue(event.target.value)
    onChange(event.target.value)
  }

  return (
    <Select
      value={editValue}
      onChange={(event) => onLocalChange(event)}
      fullWidth
    >
      {items.map((item) => {
        return (
          <MenuItem key={item.key} value={item.key}>
            {item.value}
          </MenuItem>
        )
      })}
    </Select>
  )
}

SelectControl.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
}

export default SelectControl
