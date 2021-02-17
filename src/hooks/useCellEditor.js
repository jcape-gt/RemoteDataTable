import { useState } from 'react'

export function useCellEditor(accessor, row, validator) {
  const [isValid, setIsValid] = useState(true)

  const onChange = (value) => {
    setIsValid(validator(value))

    const updatedValues = {
      ...row.state.dirtyValues,
      ...{ [accessor]: value }
    }

    row.setState((oldState) => {
      return { ...oldState, ...{ dirtyValues: updatedValues } }
    })
  }

  return [isValid, onChange]
}
