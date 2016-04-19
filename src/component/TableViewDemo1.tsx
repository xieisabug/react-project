/**
 * Created by Gene on 16/4/8.
 */

import thunk from 'redux-thunk';
import createLogger = require("redux-logger");
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';

import reducer from './MKTableView/MKTableViewReducer';
import { MKTableView, MKTableViewCell } from './MKTableView';

const logger = createLogger();
const store = createStore(reducer, compose(
    applyMiddleware(
        thunk,
        logger
    ),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
));

class CustomTableViewCell extends MKTableViewCell {

    initializeSubviews() {
        const {text} = this.props;

        return (
            <div>{'CellContent' + text}</div>
        )
    }
}


class TableViewDemo extends React.Component<any, any> implements MkTableViewDataSource {

    data = [{text: 'cell1'}, {text: 'cell2'}, {text: 'cell3'}, {text: 'cell4'}, {text: 'cell5'}, {text: 'cell6'}, {text: 'cell7'}, {text: 'cell8'}, {text: 'cell9'}, {text: 'cell10'},
        {text: 'cell1'}, {text: 'cell2'}, {text: 'cell3'}, {text: 'cell4'}, {text: 'cell5'}, {text: 'cell6'}, {text: 'cell7'}, {text: 'cell8'}, {text: 'cell9'}, {text: 'cell10'},
        {text: 'cell1'}, {text: 'cell2'}, {text: 'cell3'}, {text: 'cell4'}, {text: 'cell5'}, {text: 'cell6'}, {text: 'cell7'}, {text: 'cell8'}, {text: 'cell9'}, {text: 'cell10'}];
    
    // MKTableViewDataSource
    numberOfSectionsInTableView(tableView) {
        return 1;
    }

    numberOfRowsInSection(tableView, section) {
        return this.data.length;
    }

    cellForRowAtIndexPath(tableView, indexPath) {
        return <CustomTableViewCell {...this.data[indexPath.row]}/>
    }
    
    // MKTableViewDelegate
    heightForRowAtIndexPath(tableView, indexPath) {
        return 44;
    }
    
    render() {
        return (
            <Provider store={store}>
                <MKTableView dataSource={this} delegate={this} />
            </Provider>
        )
    }
}

export default TableViewDemo;