import PropTypes from 'prop-types'
import React from 'react'
import DataTextControl from '../dataControls/DataTextControl'

/**
 * A text control cell with view/edit display modes
 * @param {object} props.cell The react-table cell object
 * @param {string} props.accessor The string accessor for the cell's field
 * @returns {ReactElement} The text control to be rendered
 */
function DataTextCell(props) {
  const { cell, accessor } = props

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
    <DataTextControl
      value={cell.value}
      editing={cell.row.state.editing}
      onChange={(val) => {
        setUpdatedValue(cell.row, accessor, val)
      }}
    />
  )
}

DataTextCell.propTypes = {
  cell: PropTypes.object.isRequired,
  accessor: PropTypes.string.isRequired
}

export default DataTextCell
