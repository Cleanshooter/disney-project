import React, { FC } from 'react';
import { TableRow, TableCell, makeStyles } from '@material-ui/core';
import DeleteButton from '../delete-button/DeleteButton';
import { Group, RowStyle } from '../../types';

const useStyles = makeStyles(() => ({
  contentTableCell: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.2rem'
  },
  content: {
    textDecoration: ({ completed }: any) => (completed ? 'line-through' : '')
  },
  deleteButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Row: FC<{
  data: Group;
  rowStyle?: RowStyle;
  onDeleteGroup: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
  onEditGroup: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
}> = ({ data, rowStyle = {}, onDeleteGroup, onEditGroup }) => {
  const { id, name } = data;
  const classes = useStyles();

  return (
    <TableRow
      style={rowStyle}
      hover
      tabIndex={-1}
    >
      <TableCell>{name}</TableCell>
      <TableCell>
        <div className={classes.deleteButtonWrapper}>
          <DeleteButton onClick={(e) => onDeleteGroup(e, data.id)} />
        </div>
      </TableCell>
      
    </TableRow>
  );
};

export default Row;
