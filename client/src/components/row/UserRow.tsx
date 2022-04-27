import React, { FC, useEffect } from 'react';
import { IStore } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { TableRow, TableCell, makeStyles } from '@material-ui/core';
import DeleteButton from '../delete-button/DeleteButton';
import SaveButton from '../save-button/SaveButton';
import { User, RowStyle, Group } from '../../types';
import * as groupActions from '../../redux/actions/group/actions';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  },
  formControl: {
    margin: 15,
    minWidth: 120,
    maxWidth: 300,
  },
}));

const Row: FC<{
  data: User;
  rowStyle?: RowStyle;
  onDeleteUser: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
  onEditUser: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    data: any
  ) => void;
}> = ({ data, rowStyle = {}, onDeleteUser, onEditUser }) => {
  const { id, email, groups } = data;
  const classes = useStyles();
  const groupState = useSelector((state: IStore) => state.groups);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(groupActions.getAllGroups());
    return () => {
      dispatch(groupActions.clearGroups());
    };
  }, []);

  const loadedGroups = groups.map(group => String(group.id));

  const [localGroups, setGroups] = React.useState<string[]>(loadedGroups && loadedGroups.length > 0 ? loadedGroups : []);

  const groupOptions = groupState.groups.map(item => (
    <MenuItem key={id + '-' + item.id} value={item.id}>{item.name}</MenuItem>
  ));

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGroups(event.target.value as string[]);
  };

  return (
    <TableRow
      style={rowStyle}
      hover
      tabIndex={-1}
    >
      <TableCell>{id}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        <FormControl className={classes.formControl}>
          <InputLabel id="groups-label">Groups</InputLabel>
          <Select
            labelId="groups-label"
            id="groups"
            value={localGroups}
            multiple
            autoWidth
            onChange={handleChange}
          >
            {groupOptions}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <div className={classes.deleteButtonWrapper}>
          <SaveButton onClick={(e) => onEditUser(e, data.id, { groups: localGroups } )} />
        </div>
      </TableCell>
      <TableCell>
        <div className={classes.deleteButtonWrapper}>
          <DeleteButton onClick={(e) => onDeleteUser(e, data.id)} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Row;
