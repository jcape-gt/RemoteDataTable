import React from 'react'
import { 
  DataDateCell, 
  DataTextCell, 
  DataTextControl,
  DataSelectCell, 
  DataTable,
  useRowEditor,
  withEditing,
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
      { id: 1, name: 'The Great Batsby', author: 'a', publishDate: '04/10/1925', genre: 1 },
      { id: 2, name: 'The Hobbit', author: 'b', publishDate: '09/21/1937', genre: 2 },
      { id: 3, name: 'The Picture of Dorian Gray', author: 'c', publishDate: '01/07/1890', genre: 3 }
    ]
  );

  const onSave = (row) => {
    const updatedBooks = row.state.dirtyValues;
    setBooks([...books].map(o => {
      if(o.id === updatedBooks.id) {
        if(updatedBooks.id === 'new') {
          updatedBooks.id = updatedBooks.name;
        }
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
  
  const EditableTextControl = withEditing(DataTextControl)

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      defaultValue: '',
      Cell: (cell) => {
        return <EditableTextControl row={cell.row} accessor='name' value={cell.value} />
      }
    },
    {
      Header: 'Author',
      accessor: 'author',
      defaultValue: '',
      Cell: (cell) => {
        return <DataTextCell cell={cell} accessor='author' />
      }
    },
    {
      Header: 'Publication Date',
      accessor: 'publishDate',
      defaultValue: '',
      Cell: (cell) => {
        return <DataDateCell cell={cell} accessor='publishDate' />
      }
    },
    {
      Header: 'Genre',
      accessor: 'genre',
      defaultValue: 'default',
      Cell: (cell) => {
        return <DataSelectCell cell={cell} accessor='genre' items={genres} />
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
      <DataTable 
        data={books} 
        columns={columns} 
        onSave={rowSave} 
        onEdit={rowEdit} 
        onRevert={rowRevert} 
        initialRowState={initialRowEditState}
        displayBlankRow={true}
      />
  )
}

export default App
