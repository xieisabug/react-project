/**
 * Created by Gene on 16/3/16.
 */

import { INCREASE_ACTION } from './actions'

function count(state = { count:10 }, action) {
    let count = state.count;

    switch (action.type) {
        case INCREASE_ACTION:
            return {count: count+1};
        default:
            return state;
    }
}

export default count;