import PropTypes from 'prop-types'
import React from 'react'
import DataControl from './DataControl'
import SelectControl from '../baseControls/SelectControl'

/**
 * Renders a text control with view and edit mode
 * @param {object} props.value Control's current data value
 * @param {bool} props.editing Whether control is in edit mode
 * @param {(val) => void} props.onChange Control's value change callback
 * @returns {ReactElement} StateControl element which handles rendering
 */
function DataSelectControl(props) {
  const { value, editing, onChange, items } = props

  const viewItem = items.find((item) => {
    return item.key === value
  })

  return (
    <DataControl
      editing={editing}
      viewControl={viewItem.value}
      editControl={
        <SelectControl value={value} onChange={onChange} items={items} />
      }
    />
  )
}

DataSelectControl.propTypes = {
  value: PropTypes.any.isRequired,
  editing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
}

export default DataSelectControl
