import * as types from '../actions/user/types';

import { IUserState, Action } from '../../types';

const initialState: IUserState = {
  users: [],
  isLoading: true,
  err: null
};

export const userReducer = (
  state = initialState,
  action: Action
): IUserState => {
  switch (action.type) {
    case types.UPDATE_USER:
      return {
        ...state
      };
    case types.ADD_USER:
      return {
        ...state
      };
    case types.DELETE_USER:
      return {
        ...state
      };
    case types.GET_ALL_USER:
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
    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users],
        isLoading: false,
        err: null
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users.filter((item) => item.id !== action.payload)],
        isLoading: false,
        err: null
      };
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        err: null
      };
    case types.UPDATE_USER_SUCCESS: {
      const users = state.users.map((user) => {
        if (user.id === action.payload.id)
          user.email = action.payload.email;
        return user;
      });
      return {
        ...state,
        users,
        isLoading: false,
        err: null
      };
    }
    case types.CLEAR_USERS:
      return {
        users: [],
        isLoading: true,
        err: null
      };
    default:
      return state;
  }
};
