import React from 'react'

export default function withEditing(Container) {
  return (props) => {
    const { row, accessor, value } = props

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
      <Container
        value={value}
        editing={row.state.editing}
        onChange={(val) => {
          setUpdatedValue(row, accessor, val)
        }}
        {...props}
      />
    )
  }
}
