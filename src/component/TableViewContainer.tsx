/**
 * Created by Gene on 16/4/8.
 */

import thunk from 'redux-thunk';
import createLogger = require("redux-logger");
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';

import reducer from './MKTableView/MKTableViewReducer';
import MKTableView from './MKTableView/MKTableView';
import MKTableViewCell from './MKTableView/MKTableViewCell';
import MKTableHeaderView from './MKTableView/MKTableHeaderView';
import MKTableFooterView from './MKTableView/MkTableFooterView';

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
            <div>{'TestCellContent' + text}</div>
        )
    }
}

class CustomTableHeaderView extends MKTableHeaderView {

    initializeSubviews() {
        return <div>下拉刷新</div>
    }
}

class CustomTableFooterView extends MKTableFooterView {
    initializeSubviews() {
        return <div>下拉加载更多</div>
    }
}

class TableViewContainer extends React.Component<any, any> implements MkTableViewDataSource, MKTableViewDelegate {

    data = [[{text: 'cell1'}, {text: 'cell2'}, {text: 'cell3'}, {text: 'cell4'}, {text: 'cell5'}, {text: 'cell6'}, {text: 'cell7'}, {text: 'cell8'}, {text: 'cell9'}, {text: 'cell10'}],
        [{text: 'cell11'}, {text: 'cell12'}, {text: 'cell13'}, {text: 'cell14'}, {text: 'cell15'}, {text: 'cell16'}, {text: 'cell17'}, {text: 'cell18'}, {text: 'cell19'}, {text: 'cell20'}],
        [{text: 'cell21'}, {text: 'cell22'}, {text: 'cell23'}, {text: 'cell24'}, {text: 'cell25'}, {text: 'cell26'}, {text: 'cell27'}, {text: 'cell28'}, {text: 'cell29'}, {text: 'cell30'}]];

    
    // MKTableViewDataSource
    numberOfSectionsInTableView(tableView) {
        return 3;
    }
    
    numberOfRowsInSection(tableView, section) {
        return this.data[section].length;
    }

    cellForRowAtIndexPath(tableView, indexPath) {
        return <CustomTableViewCell {...this.data[indexPath.section][indexPath.row]}/>
    }

    titleForHeaderInSection(tableView, section) {
        return 'title';
    }
    
    // MKTableViewDelegate
    heightForRowAtIndexPath(tableView, indexPath) {
        return 50;
    }

    heightForHeaderInSection(tableView, section) {
        return 30;
    }

    render() {
        return (
            <Provider store={store}>
                <MKTableView dataSource={this} delegate={this} tableHeaderView={true} tableFooterView={true} maxPointY={16} minPointY={16}>
                    <CustomTableHeaderView />
                    <CustomTableFooterView />
                </MKTableView>
            </Provider>
        )
    }
}

export default TableViewContainer;