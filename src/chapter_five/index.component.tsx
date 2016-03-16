/**
 * Created by Gene on 16/3/16.
 */

/// <reference path="../../typings/tsd.d.ts" />

import { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as Actions from './actions';

class IndexComponent extends Component<any, any> {
    render() {
        const { value, increment } = this.props;

        return (
            <div>
                <span>{value}</span>
                <button onClick={increment}>Increase</button>
            </div>
        )
    }
}

//IndexComponent.propTypes = {
//    value : PropTypes.string.isRequired,
//    onIncreaseClick : PropTypes.func.isRequired
//};


function mapStateToProps(state) {
    return {
        value: state.count
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexComponent);