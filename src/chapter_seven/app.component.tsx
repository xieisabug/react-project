/**
 * Created by Gene on 16/3/21.
 */

import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger = require("redux-logger");

import reducer from './reducers'
import AsyncApp from './AsyncApp';

const logger = createLogger();
const store = createStore(reducer, compose(
    applyMiddleware(thunk, logger),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
));

class AppComponent extends React.Component<any,any> {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        )
    }
}

export default AppComponent;