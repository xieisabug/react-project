/**
 * Created by Gene on 16/3/17.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import logonReducer from './logon.reducer';
import managerReducer from './manager.reducer';

export default combineReducers({
    logonReducer,
    managerReducer,
    routing: routerReducer
});