/**
 * Created by Gene on 16/3/11.
 */
/// <reference path="../../typings/tsd.d.ts" />

class AppComponent extends React.Component<any, any> {

    render() {
        return <div>Hello {this.props['name']}</div>
    }
}

export default AppComponent;