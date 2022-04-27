import React, { useState, useEffect } from 'react';
import { TextField, makeStyles, Theme } from '@material-ui/core';
import UserTable from '../containers/UserTable';
import { UserCreds } from '../types';
import AddButton from '../components/add-button/AddButton';

import { IStore } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../redux/actions/user/actions';

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
  todoListWrapper: {
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
  { id: 'user', label: 'User ID', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'groups', label: 'Groups', minWidth: 250 },
  { id: 'save', label: '', minWidth: 10 },
  { id: 'delete', label: '', minWidth: 10 },
];

const Users = () => {
  const [creds, setCreds] = useState<UserCreds>({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const classes = useStyles();

  const usersState = useSelector((state: IStore) => state.users);
  // const authState = useSelector((state: IStore) => state.auth);

  useEffect(() => {
    setCreds({
      email: '',
      password: ''
    });
  }, []);

  useEffect(() => {
    dispatch(userActions.getAllUsers());
    return () => {
      dispatch(userActions.clearUsers());
    };
  }, []);

  const onDeleteUserHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    return (userId: string) => {
      dispatch(userActions.deleteUser(userId));
    };
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;

    setCreds((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const onAddUserHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (creds.email.trim() && creds.password.trim()) {
      dispatch(userActions.addUser(creds));
      setCreds({
        email: '',
        password: ''
      });
    }
  };

  const onEditUserHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    return (userId: string, data: any) => {
      console.log(data);
      dispatch(userActions.updateUser(userId, data));
    };
  };


  return (
    <>
      <div className={classes.demoWrapper}>
        <div style={{ height: '64px' }} />
        <div className={classes.todoListWrapper}>
          <div className={classes.title}>Manage Users</div>
          <div className={classes.formWrapper}>
          <form
            onSubmit={onAddUserHandler}
            style={{ display: 'flex', flexDirection: 'column', width: '350px' }}
          >
            <TextField
              style={{ margin: '0.5rem 0' }}
              variant="outlined"
              id="email"
              type="email"
              onChange={onChangeHandler}
              value={creds.email}
              label="Email"
              required
            />
            <TextField
              style={{ margin: '0.5rem 0' }}
              variant="outlined"
              id="password"
              type="password"
              onChange={onChangeHandler}
              value={creds.password}
              label="Password"
              required
            />
            <AddButton
              style={{
                height: '48px',
                background: '#FF0083',
                color: 'white',
                marginTop: '2rem'
              }}
            >
              Add User
            </AddButton>
          </form>
          </div>
          <UserTable
            isLoading={usersState.isLoading}
            header={header}
            data={usersState.users}
            stickyHeader={true}
            placeHolder="No users found"
            headerStyle={{ background: 'black' }}
            rowStyle={{ color: 'black', fontSize: '1.5rem' }}
            onDeleteUser={(e, userId) => onDeleteUserHandler(e)(userId)}
            onEditUser={(e, userId, data) =>
              onEditUserHandler(e)(userId, data)
            }
          />
        </div>
      </div>
    </>
  );
};

export default Users;
