/**
 * Created by Gene on 16/3/29.
 */

import { connect } from 'react-redux';
import { addUserAction, modifyUserPropertyAction } from '../actions/manager.action';
import { bindActionCreators } from 'redux';

class NewUserComponent extends React.Component<any, any> {


    componentWillMount() {
        const {params} = this.props;
        this.setState(params);
    }

    addUser = () => {
        const { addUserAction } = this.props;
        addUserAction(
            this.refs['username']['value'],
            this.refs['age']['value']
        );
    };

    modifyUser = () => {
        const { modifyUserPropertyAction } = this.props;
        modifyUserPropertyAction(
            this.refs['username']['value'],
            this.refs['age']['value'],
            this.state['seq']
        );
    };

    render() {
        const { route } = this.props;
        return (
            <div>
                <input ref="username" placeholder="username" defaultValue={this.state.username}/>
                <input ref="age" placeholder="age" defaultValue={this.state.age}/>
                <button onClick={route.path === '/newUser' ? this.addUser : this.modifyUser}>save</button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addUserAction,modifyUserPropertyAction}, dispatch);
}


export default connect(null, mapDispatchToProps)(NewUserComponent);