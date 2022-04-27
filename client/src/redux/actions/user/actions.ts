import { Dispatch } from 'react';

import * as types from './types';

import { User } from '../../../types';
import { setSnackBar } from '../ui/actions';

import * as userAPI from '../../../api/user';

//----- GET USERS ----- //
const createGetAllUser = () => {
  return {
    type: types.GET_ALL_USER
  };
};

const getAllUsersSuccess = (data: User[]) => {
  return {
    type: types.GET_ALL_USERS_SUCCESS,
    payload: data
  };
};

export const getAllUsers = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createGetAllUser());
    const res = await userAPI.getAllUsers();
    dispatch(getAllUsersSuccess(res.data));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- EDIT USER ----- //
const createUpdateUser = () => {
  return {
    type: types.UPDATE_USER
  };
};

const updateUserSuccess = (data: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.UPDATE_USER_SUCCESS,
    payload: data
  });
  dispatch(
    setSnackBar({
      type: 'info',
      msg: `User was updated`
    })
  );
};

export const updateUser = (id: string, data: any) => async (
  dispatch: Dispatch<any>
) => {
  try {
    dispatch(createUpdateUser());
    await userAPI.updateUser(id, data);
    dispatch(updateUserSuccess({ id, data }));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- ADD USER ----- //
const createAddUser = () => {
  return {
    type: types.ADD_USER
  };
};
const addUserSuccess = (data: User) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.ADD_USER_SUCCESS,
    payload: data
  });
  dispatch(setSnackBar({ type: 'success', msg: `${data.email} was added` }));
};
export const addUser = (data: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createAddUser());
    const res = await userAPI.addUser(data);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- DELETE USER ----- //
const createDeleteUser = () => {
  return {
    type: types.DELETE_USER
  };
};

const deleteUserSuccess = (id: string) => (disptach: Dispatch<any>) => {
  disptach({
    type: types.DELETE_USER_SUCCESS,
    payload: id
  });
  disptach(setSnackBar({ type: 'info', msg: 'User deleted successfully' }));
};

export const deleteUser = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createDeleteUser());
    await userAPI.deleteUser(id);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

const catchRequestErr = (err: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.REQUEST_FAILURE,
    payload: err.message
  });
  setSnackBar({ type: 'error', msg: err.message });
};

export const clearUsers = () => {
  return {
    type: types.CLEAR_USERS
  };
};
