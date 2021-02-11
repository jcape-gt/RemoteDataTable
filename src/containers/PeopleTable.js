import React, {useEffect, useState} from 'react';
import useRowEditor from '../hooks/useRowEditor';
import DataTable from './DataTable';
import DataTextControl from './dataControls/DataTextControl';
import DataDateControl from './dataControls/DataDateControl';
import DataSelectControl from './dataControls/DataSelectControl';
import withEditing from '../hocs/withEditing';

export default function PeopleTable(props) {

  const headers = new Headers({
    'X-Api-Key': 'NyvFYiLAHi7VoZZrmyDD91zwFmg8R4Ia4WdAiaNl',
    ///'Content-Type': 'application/json'
  });

  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch('https://q5dfc5aq5b.execute-api.us-east-1.amazonaws.com/dev/category/1/deal', {
      headers: headers,
      method: 'GET',
    }).then(
      res => res.json().then((t) => console.log(t))
      //res => console.log(res)
    ).catch(err => {
      console.log(err);
    })
  });

  const [contact, setContact] = useState([]);
  useEffect(() => {
    fetch('https://q5dfc5aq5b.execute-api.us-east-1.amazonaws.com/dev/contact', {
      headers: headers,
      method: 'GET',
    }).then(
      res => res.json().then((t) => console.log(t))
      //res => console.log(res)
    ).catch(err => {
      console.log(err);
    })
  });

  const [data, setData] = React.useState(
    [
      { id: 1, name: 'Jesse', birthday: '10/27/1988', gender: 1 },
      { id: 2, name: 'Brittany', birthday: '11/23/1989', gender: 0 },
      { id: 3, name: 'Molli', birthday: '04/06/2018', gender: 0 },
    ]
  );

  const gender = [
    {key: 'default', value: ''},
    { key: 0, value: 'female' },
    { key: 1, value: 'male' },
  ];

  /**
   * Handles save logic for the updated data
   * @param {Object} updatedData Updated object to be saved 
   */
  const onSave = (row) => {
    const updatedData = row.state.dirtyValues;
    setData([...data].map(o => {
      if(o.id === updatedData.id) {
        return {...o, ...updatedData}
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
  ] = useRowEditor(onEdit, onSave, onRevert);

  const EditableCell = withEditing(DataTextControl);
  const EditableDateCell = withEditing(DataDateControl);
  const EditableSelectCell = withEditing(DataSelectControl);

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
      Header: 'Birthday',
      accessor: 'birthday',
      defaultValue: '',
      Cell: (cell) => {
        return (
          <EditableDateCell 
            value={cell.value} 
            row={cell.row} 
            accessor='birthday' 
          />
        )
      }
    },
    {
      Header: 'Gender',
      accessor: 'gender',
      defaultValue: 'default',
      Cell: (cell) => {
        return (
          <EditableSelectCell 
            value={cell.value} 
            row={cell.row} 
            accessor='gender' 
            items={gender}
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
      data={data} 
      columns={columns} 
      onSave={rowSave} 
      onEdit={rowEdit}
      onRevert={rowRevert}
      initialRowState={initialRowEditState}
      displayBlankRow={true}
    />
  )
}