/**
 * Created by Gene on 16/3/16.
 */

/// <reference path="../../typings/tsd.d.ts" />

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as Actions from './actions';

class IndexComponent extends React.Component<any, any> {
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

function mapStateToProps(state) {
    return {
        value: state.count
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexComponent);