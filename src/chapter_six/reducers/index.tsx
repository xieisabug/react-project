/**
 * Created by Gene on 16/3/17.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import logon from './logon.reducer';
import manager from './manager.reducer';

export default combineReducers({
    logon,
    manager,
    routing: routerReducer
});