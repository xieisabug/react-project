/**
 * Created by Gene on 16/3/28.
 */

import UserTableRowComponent from './user.table.row.component';

class UserTableComponent extends React.Component<any, any> {

    render() {
        const { users, modifyUserProperty, openUserFormAction } = this.props;

        var rows = [];

        users.forEach(function(user, index){
            user['seq'] = index;
            rows.push(<UserTableRowComponent {...user} key={user.userName} modifyUserProperty={modifyUserProperty} openUserFormAction={openUserFormAction} />);
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>seq</th>
                        <th>username</th>
                        <th>age</th>
                        <th>oper</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

export default UserTableComponent;