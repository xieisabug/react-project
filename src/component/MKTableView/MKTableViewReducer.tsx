/**
 * Created by Gene on 16/4/11.
 */

import { INIT_SCROLL_HEIGHT } from './MKTableViewAction';

import objectAssign = require('object-assign');

let initializeState = {
    scrollContainerHeight: 0,
    scrollContentHeight: 0
};

export default (state = initializeState, action) => {
    switch (action.type) {
        case INIT_SCROLL_HEIGHT:
            return objectAssign({}, state, {scrollContainerHeight: action.scrollContainerHeight, scrollContentHeight: action.scrollContentHeight});
        default:
            return state;
    }
}