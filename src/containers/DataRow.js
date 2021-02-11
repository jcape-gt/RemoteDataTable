import React from 'react';
import DataRowEditControl from './rowControls/DataRowEditControl';
import DataRowViewControl from './rowControls/DataRowViewControl';
import RowStateControl from './rowControls/RowStateControl';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';

/**
 * Renders a data table supporting CRUD functionalities
 * @param {Array} props.row The data row to edit 
 * @param {(row) => void)} props.onEdit Callback when edit is triggered
 * @param {(row) => void)} props.onSave Callback when save is triggered
 * @param {(row) => void)} props.onRevert Callback when revert is triggered
 * @returns {ReactElement} The data row to be rendered
 */
function DataRow(props) {
  const { row, onEdit, onSave, onRevert } = props;

  return (
    <TableRow {...row.getRowProps()} className={row.state.className} >
      <TableCell style={{width: 170}}>
        <RowStateControl 
          editing={row.state.editing}
          viewControl={
            <DataRowViewControl 
              row={row} 
              onEditClick={() => {onEdit(row)}} 
            />
          }
          editControl={
            <DataRowEditControl 
              row={row} 
              onSaveClick={() => onSave(row)} 
              onCancelClick={() => onRevert(row)} 
            />
          }
        />
      </TableCell>
      {row.cells.map(cell => {
        return (
          <TableCell {...cell.getCellProps()} style={{width: 200}}>
            {cell.render('Cell')}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

DataRow.propTypes = {
  row: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRevert: PropTypes.func.isRequired,
}

export default DataRow;
