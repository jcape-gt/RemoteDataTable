import React from 'react'
import { 
  DataDateCell, 
  DataTextCell, 
  DataSelectCell, 
  DataTable,
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
      { id: 1, name: 'The Great Gatsby', publishDate: '04/10/1925', genre: 1 },
      { id: 2, name: 'The Hobbit', publishDate: '09/21/1937', genre: 2 },
      { id: 3, name: 'The Picture of Dorian Gray', publishDate: '01/07/1890', genre: 3 }
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
    console.log('Editing..');
  }

  const onRevert = (row) => {
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

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      defaultValue: '',
      Cell: (cell) => {
        const validation = { required: true, message: 'Please enter a name' }
        return <DataTextCell cell={cell} accessor='name' validation={validation} />
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
        const validation = {
          required: true,
          defaultValue: 'default',
          message: 'Please select a genre'
        }
        return (
          <DataSelectCell 
            cell={cell} 
            accessor='genre' 
            items={genres} 
            validation={validation} 
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
