# reactdatatable

> A CRUD data table for React. Supports the following functionalities:
> - Rows automatically support read/edit mode 
> - Revert edit functionality 
> - Text, Select, and DateTime controls in edit mode
> - Callbacks for create, read, update, and delete 

Currently in dev and not ready for public use, but drop me a line at jcape.gatech@gmail.com if interested :) 

[![NPM](https://img.shields.io/npm/v/reactdatatable.svg)](https://www.npmjs.com/package/reactdatatable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install
Requires React v16 due to constraints from dependent packages 

```bash
npm install --save reactdatatable
```

## Usage
Super bloated usage example, but it is what it is

```jsx
import React from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { 
  DataDateControl, 
  DataTextControl, 
  DataSelectControl, 
  DataTable,
  withEditing,
  useRowEditor
} from 'reactdatatable'
import 'reactdatatable/dist/index.css'

const genres = [
  { key: 'default', value: '' },
  { key: 1, value: 'Historical Fiction' },
  { key: 2, value: 'Fantasy' },
  { key: 3, value: 'Gothic Fiction' }
]

const App = () => {

  const [books, setBooks] = React.useState(
    [
      { id: 1, name: 'The Great Batsby', publishDate: '04/10/1925', genre: 1 },
      { id: 2, name: 'The Hobbit', publishDate: '09/21/1937', genre: 2 },
      { id: 3, name: 'The Picture of Dorian Gray', publishDate: '01/07/1890', genre: 3 }
    ]
  );

  const onSave = (row) => {
    const updatedBooks = row.state.dirtyValues;
    setBooks([...books].map(o => {
      if(o.id === updatedBooks.id) {
        return {...o, ...updatedBooks}
      }
      else return o;
    }))
  }

  const onEdit = (row) => {
    row.setState((prevState) => {
      return {...prevState, ...{className: 'Mui-selected'}}
    })
    console.log('Editing..');
  }

  const onRevert = (row) => {
    row.setState((prevState) => {
      return {...prevState, ...{className: 'row-read'}}
    })
    console.log('onRevert..');
  }

  const [ 
    initialRowEditState, 
    rowEdit, 
    rowSave, 
    rowRevert 
  ] = useRowEditor(
    (row) => {onEdit(row)},
    (row) => {onSave(row)},
    (row) => {onRevert(row)}
  )

  const EditableCell = withEditing(DataTextControl)
  const EditableDateCell = withEditing(DataDateControl)
  const EditableSelectCell = withEditing(DataSelectControl)

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      defaultValue: '',
      Cell: (cell) => {
        return (
          <EditableCell 
            value={cell.value} 
            accessor='name'
            row={cell.row} 
          />
        )
      }
    },
    {
      Header: 'Publication Date',
      accessor: 'publishDate',
      defaultValue: '',
      Cell: (cell) => {
        return (
          <EditableDateCell 
            value={cell.value} 
            row={cell.row} 
            accessor='publishDate' 
          />
        )
      }
    },
    {
      Header: 'Genre',
      accessor: 'genre',
      defaultValue: 'default',
      Cell: (cell) => {
        return (
          <EditableSelectCell 
            value={cell.value} 
            row={cell.row} 
            accessor='genre' 
            items={genres}
          />
        )
      }
    },
    {
      accessor: 'id',
      defaultValue: 'new',
      Cell: (props) => {
        return(<div></div>);
      }
    },
  ]

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DataTable 
        data={books} 
        columns={columns} 
        onSave={rowSave} 
        onEdit={rowEdit} 
        onRevert={rowRevert} 
        initialRowState={initialRowEditState}
        displayBlankRow={true}
      />
    </MuiPickersUtilsProvider>
  )
}

export default App
```

## License

MIT © [jcape-gt](https://github.com/jcape-gt)
