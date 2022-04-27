import React, { useState, useEffect } from 'react';
import { TextField, makeStyles, Theme } from '@material-ui/core';
import GroupsTable from '../containers/GroupTable';
import AddButton from '../components/add-button/AddButton';

import { IStore } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import * as groupActions from '../redux/actions/group/actions';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    whiteSpace: 'nowrap'
  },
  form: {
    width: '100%',
    height: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  formWrapper: {
    marginBottom: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  demoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.rem',
    fontWeight: 'bold',
    height: '100%',
    flexDirection: 'column'
  },
  groupListWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
    padding: '16px',

    [theme.breakpoints.down('md')]: {
      width: ' 90%',
      padding: '0 6px 6px 6px'
    }
  },
  userLabel: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: '2rem'
  }
}));

const header = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'actions', label: '', minWidth: 10 },
];

const Groups = () => {
  const [newGroup, setNewGroup] = useState<string>('');

  const dispatch = useDispatch();

  const classes = useStyles();

  const groupState = useSelector((state: IStore) => state.groups);
  const authState = useSelector((state: IStore) => state.auth);

  useEffect(() => {
    dispatch(groupActions.getAllGroups());
    return () => {
      dispatch(groupActions.clearGroups());
    };
  }, []);

  const onDeleteGroupHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    return (groupId: string) => {
      dispatch(groupActions.deleteGroup(groupId));
    };
  };

  const onAddGroupHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroup.trim()) {
      dispatch(groupActions.addGroup(newGroup));
      setNewGroup('');
    }
  };

  const onEditGroupHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    return (groupId: string) => {
      dispatch(groupActions.updateGroup(groupId, {}));
    };
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewGroup(name);
  };

  return (
    <>
      <div className={classes.demoWrapper}>
        <div style={{ height: '64px' }} />
        <div className={classes.groupListWrapper}>
          <div className={classes.userLabel}>
            {authState.currentUser?.email &&
              `Hi, ${authState.currentUser?.email}`}
          </div>
          <div className={classes.title}>User Groups</div>
          <div className={classes.formWrapper}>
            <form className={classes.form} onSubmit={onAddGroupHandler}>
              <TextField
                variant="outlined"
                style={{ marginBottom: '1rem' }}
                value={newGroup}
                onChange={onChangeHandler}
              />
              <AddButton />
            </form>
          </div>
          <GroupsTable
            isLoading={groupState.isLoading}
            header={header}
            data={groupState.groups}
            stickyHeader={true}
            placeHolder="Nothing to do"
            headerStyle={{ background: 'black' }}
            rowStyle={{ color: 'black', fontSize: '1.5rem' }}
            onDeleteGroup={(e, groupId) => onDeleteGroupHandler(e)(groupId)}
            onEditGroup={(e, groupId) =>
              onEditGroupHandler(e)(groupId)
            }
          />
        </div>
      </div>
    </>
  );
};

export default Groups;
