/**
 * Created by Gene on 16/3/28.
 */

class UserTableRowComponent extends React.Component<any, any> {

    selected = () => {
        const { modifyUserProperty } = this.props;
        modifyUserProperty(
            this.refs['seq']['innerHTML'],
            this.refs['checkbox']['checked']
        );
    };

    openUserForm = () => {
        const { openUserFormAction } = this.props;
        openUserFormAction(
            this.refs['username']['innerHTML'],
            this.refs['age']['innerHTML'],
            this.refs['seq']['innerHTML']
        );
    };

    render() {

        const {userName, age, seq} = this.props;

        return (
            <tr>
                <td>
                    <input type="checkbox" onClick={this.selected} ref="checkbox" />
                </td>
                <td ref="seq">{seq}</td>
                <td ref="username">{userName}</td>
                <td ref="age">{age}</td>
                <td><button onClick={this.openUserForm}>编辑</button></td>
            </tr>
        );
    }
}


export default UserTableRowComponent;