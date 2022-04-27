import { Dispatch } from 'react';

import * as types from './types';

import { Group } from '../../../types';
import { setSnackBar } from '../ui/actions';

import * as groupAPI from '../../../api/group';

//----- GET GROUPS ----- //
const createGetAllGroup = () => {
  return {
    type: types.GET_ALL_GROUP
  };
};

const getAllGroupsSuccess = (data: Group[]) => {
  return {
    type: types.GET_ALL_GROUPS_SUCCESS,
    payload: data
  };
};

export const getAllGroups = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createGetAllGroup());
    const res = await groupAPI.getAllGroups();
    dispatch(getAllGroupsSuccess(res.data));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- EDIT GROUP ----- //
const createUpdateGroup = () => {
  return {
    type: types.UPDATE_GROUP
  };
};

const updateGroupSuccess = (data: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.UPDATE_GROUP_SUCCESS,
    payload: data
  });
  dispatch(
    setSnackBar({
      type: 'info',
      msg: `Group was updated`
    })
  );
};

export const updateGroup = (id: string, data: any) => async (
  dispatch: Dispatch<any>
) => {
  try {
    dispatch(createUpdateGroup());
    await groupAPI.updateGroup(id, data);
    dispatch(updateGroupSuccess({ id, data }));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- ADD GROUP ----- //
const createAddGroup = () => {
  return {
    type: types.ADD_GROUP
  };
};
const addGroupSuccess = (data: Group) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.ADD_GROUP_SUCCESS,
    payload: data
  });
  dispatch(setSnackBar({ type: 'success', msg: `${data.name} was added` }));
};
export const addGroup = (data: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createAddGroup());
    const res = await groupAPI.addGroup(data);
    dispatch(addGroupSuccess(res.data));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- DELETE GROUP ----- //
const createDeleteGroup = () => {
  return {
    type: types.DELETE_GROUP
  };
};

const deleteGroupSuccess = (id: string) => (disptach: Dispatch<any>) => {
  disptach({
    type: types.DELETE_GROUP_SUCCESS,
    payload: id
  });
  disptach(setSnackBar({ type: 'info', msg: 'Group deleted successfully' }));
};

export const deleteGroup = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createDeleteGroup());
    await groupAPI.deleteGroup(id);
    dispatch(deleteGroupSuccess(id));
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

export const clearGroups = () => {
  return {
    type: types.CLEAR_GROUPS
  };
};
