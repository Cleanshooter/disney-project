import React, { FC } from 'react';
import { Paper, Table, TableContainer, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { IGroupTable } from '../types';
import TableHeader from '../components/header/Header';
import RowPlaceHolder from '../components/row/RowPlaceHolder';
import Row from '../components/row/GroupRow';

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
const GroupsTable: FC<IGroupTable> = ({
  data,
  header,
  headerStyle,
  rowStyle,
  placeHolder,
  isLoading,
  onDeleteGroup,
  onEditGroup,
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
            data.map((group) => {
              return (
                <Row
                  key={group.id}
                  data={group}
                  rowStyle={rowStyle}
                  onDeleteGroup={(e, id) => onDeleteGroup(e, id)}
                  onEditGroup={(e, id) =>
                    onEditGroup(e, id)
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

export default GroupsTable;
