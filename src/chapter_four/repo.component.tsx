/**
 * Created by Gene on 16/3/15.
 */


class Repo extends React.Component<any, any> {


    render() {
        const { params } = this.props;
        return (
            <div>
                <h2>{params['repoName']}</h2>
            </div>
        )
    }
}

export default Repo;