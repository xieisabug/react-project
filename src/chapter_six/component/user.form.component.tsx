/**
 * Created by Gene on 16/3/29.
 */

import { connect } from 'react-redux';
import { addUserAction, modifyUserPropertyAction } from '../actions/manager.action';
import { bindActionCreators } from 'redux';

class NewUserComponent extends React.Component<any, any> {



    addUser = () => {
        const { addUserAction } = this.props;
        addUserAction(
            this.refs['username']['value'],
            this.refs['age']['value']
        );
    };

    modifyUser = () => {
        const { modifyUserPropertyAction, params } = this.props;
        modifyUserPropertyAction(
            this.refs['username']['value'],
            this.refs['age']['value'],
            params.seq
        );
    };

    render() {
        const { route, user } = this.props;
        return (
            <div>
                <input ref="username" placeholder="username" defaultValue={user.userName}/>
                <input ref="age" placeholder="age" defaultValue={user.age}/>
                <button onClick={route.path === '/newUser' ? this.addUser : this.modifyUser}>save</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {user} = state.managerReducer;
    return {
        user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addUserAction,modifyUserPropertyAction}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NewUserComponent);