import { useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'

export default function useRowEditor(onEdit, onSave, onRevert) {
  const [rowEditor, setRowEditor] = useState({ isEditing: false, snapshot: {} })

  const initialRowEditState = {
    editing: false,
    dirtyValues: {}
  }

  useBeforeunload(() => {
    if (rowEditor.isEditing) {
      return 'Are you sure you wish to exit while editing?'
    }
  })

  const rowEdit = (row) => {
    if (!rowEditor.isEditing) {
      onEdit(row)
      setRowEditor({ ...rowEditor, ...{ isEditing: true, snapshot: row } })
      row.setState({
        ...row.state,
        ...{ editing: true, dirtyValues: row.values }
      })
    }
  }

  const rowSave = (row) => {
    if (row.state.editing) {
      onSave(row)
      setRowEditor({ ...rowEditor, ...{ isEditing: false, snapshot: {} } })
      row.setState({ ...row.state, ...{ editing: false } })
    }
  }

  const rowRevert = (row) => {
    if (row.state.editing) {
      onRevert(row)
      setRowEditor({ ...rowEditor, ...{ isEditing: false, snapshot: {} } })
      row.setState({ ...row.state, ...{ editing: false } })
    }
  }

  return [initialRowEditState, rowEdit, rowSave, rowRevert]
}
