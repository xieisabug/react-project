/**
 * Created by Gene on 16/3/28.
 */

import { Link } from 'react-router';

class ToolBarComponent extends React.Component<any, any> {
    render() {
        const { deleteUser } = this.props;
        return (
            <div>
                <Link to="/newUser">新增</Link>
                <button onClick={deleteUser}>删除所选项</button>
            </div>
        )
    }
}

export default ToolBarComponent;