import PropTypes from 'prop-types'
import React from 'react'
import DataSelectControl from '../dataControls/DataSelectControl'

/**
 * A date control cell with view/edit display modes
 * @param {object} props.cell The react-table cell object
 * @param {string} props.accessor The string accessor for the cell's field
 * @param {array} props.items The select control's item list
 * @returns {ReactElement} The select control to be rendered
 */
function DataSelectCell(props) {
  const { cell, accessor, items } = props

  const setUpdatedValue = (row, accessor, value) => {
    const updatedValues = {
      ...row.state.dirtyValues,
      ...{ [accessor]: value }
    }

    row.setState((oldState) => {
      return { ...oldState, ...{ dirtyValues: updatedValues } }
    })
  }

  return (
    <DataSelectControl
      value={cell.value}
      editing={cell.row.state.editing}
      onChange={(val) => {
        setUpdatedValue(cell.row, accessor, val)
      }}
      items={items}
    />
  )
}

DataSelectCell.propTypes = {
  cell: PropTypes.object.isRequired,
  accessor: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}

export default DataSelectCell
