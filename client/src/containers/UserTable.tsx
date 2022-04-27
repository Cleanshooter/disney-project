import React, { FC } from 'react';
import { Paper, Table, TableContainer, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { IUserTable } from '../types';
import TableHeader from '../components/header/Header';
import RowPlaceHolder from '../components/row/RowPlaceHolder';
import UserRow from '../components/row/UserRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  container: {
    maxHeight: '100%',
    scrollBehavior: 'smooth',
    overflow: 'auto'
  }
});
const UsersTable: FC<IUserTable> = ({
  data,
  header,
  headerStyle,
  rowStyle,
  placeHolder,
  isLoading,
  onDeleteUser,
  onEditUser,
  stickyHeader = true
}) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper} elevation={6}>
      <Table
        stickyHeader={stickyHeader}
        style={{ maxHeight: '100%' }}
        aria-label="sticky table"
      >
        <TableHeader data={header} headerStyle={headerStyle} />
        <TableBody>
          {data.length ? (
            data.map((user) => {
              return (
                <UserRow
                  key={user.id}
                  data={user}
                  rowStyle={rowStyle}
                  onDeleteUser={(e, id) => onDeleteUser(e, id)}
                  onEditUser={(e, id, groups) =>
                    onEditUser(e, id, groups)
                  }
                />
              );
            })
          ) : (
            <RowPlaceHolder
              placeHolder={
                isLoading
                  ? 'Loading...'
                  : placeHolder || 'Put your place holder here'
              }
              colSpan={header.length}
              rowStyle={rowStyle}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
