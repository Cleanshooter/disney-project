import * as types from '../actions/group/types';

import { IGroupState, Action } from '../../types';

const initialState: IGroupState = {
  groups: [],
  isLoading: true,
  err: null
};

export const groupReducer = (
  state = initialState,
  action: Action
): IGroupState => {
  switch (action.type) {
    case types.UPDATE_GROUP:
      return {
        ...state
      };
    case types.ADD_GROUP:
      return {
        ...state
      };
    case types.DELETE_GROUP:
      return {
        ...state
      };
    case types.GET_ALL_GROUP:
      return {
        ...state,
        isLoading: true
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    case types.ADD_GROUP_SUCCESS:
      return {
        ...state,
        groups: [action.payload, ...state.groups],
        isLoading: false,
        err: null
      };
    case types.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        groups: [...state.groups.filter((item) => item.id !== action.payload)],
        isLoading: false,
        err: null
      };
    case types.GET_ALL_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
        isLoading: false,
        err: null
      };
    case types.UPDATE_GROUP_SUCCESS: {
      const groups = state.groups.map((group) => {
        if (group.id === action.payload.id)
          group.name = action.payload.name;
        return group;
      });
      return {
        ...state,
        groups,
        isLoading: false,
        err: null
      };
    }
    case types.CLEAR_GROUPS:
      return {
        groups: [],
        isLoading: true,
        err: null
      };
    default:
      return state;
  }
};
