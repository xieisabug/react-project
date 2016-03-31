/**
 * Created by Gene on 16/3/17.
 */

import { ADD_USER, DELETE_USER, MODIFY_USER, REQUEST_GET, RECEIVE_GET } from '../actions/manager.action';

import objectAssign = require("object-assign");

export default (state = {isFetching: false, users:[]}, action) => {

    switch (action.type) {
        case REQUEST_GET:
            return objectAssign({}, state, {isFetching:true});
        case RECEIVE_GET:
            return objectAssign({}, state, {isFetching:false, users: action.users});
        case ADD_USER:
            return objectAssign({}, state, {isFetching:false, users: [...state.users,action.user]});
        case MODIFY_USER:
            var users = [...state.users];
            if(typeof action.checked === 'boolean') {
                users[action.index].checked = action.checked;
            } else {
                users[action.seq] = objectAssign(users[action.seq],{userName:action.username,age:action.age});
            }
            return objectAssign({}, state, {isFetching:false, users:users});
        case DELETE_USER:
            var users = [];
            state.users.forEach(function(user){
                if(!user.checked) {
                    users.push(user);
                }
            });

            return objectAssign({}, state, {isFetching:false, users:users});

        default:
            return state;
    }
};