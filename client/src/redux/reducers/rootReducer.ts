import { combineReducers } from 'redux';
import { todoReducer } from './todoReducer';
import { userReducer } from './userReducer';
import { groupReducer } from './groupReducer';
import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  todo: todoReducer,
  users: userReducer,
  groups: groupReducer,
  ui: uiReducer,
  auth: authReducer
});
