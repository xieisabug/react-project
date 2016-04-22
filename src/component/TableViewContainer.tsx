/**
 * Created by Gene on 16/4/8.
 */

import thunk from 'redux-thunk';
import createLogger = require("redux-logger");
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';

import reducer from './MKTableView/MKTableViewReducer';
import { MKTableView, MKTableViewCell, MKTableHeaderView, MKTableFooterView} from './MKTableView';

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
            <div >{'TestCellContent' + text}</div>
        )
    }
}

class CustomTableViewCell1 extends MKTableViewCell {

    initializeSubviews() {
        const {text} = this.props;

        return (
            <div id="tttttt">{'TestCellContent' + text}</div>
        )
    }
}

class CustomTableHeaderView extends MKTableHeaderView {

    initializeSubviews() {

        const {text} = this.props;

        return <div >{text}</div>
    }
}

class CustomTableFooterView extends MKTableFooterView {

    initializeSubviews() {

        const {text} = this.props;

        return <div>{text}</div>
    }
}

class TableViewContainer extends React.Component<any, any> implements MkTableViewDataSource, MKTableViewDelegate {

    data = [[{text: 'cell1'}, {text: 'cell2'}, {text: 'cell3'}, {text: 'cell4'}, {text: 'cell5'}, {text: 'cell6'}, {text: 'cell7'}, {text: 'cell8'}, {text: 'cell9'}, {text: 'cell10'}],
        [{text: 'cell11'}, {text: 'cell12'}, {text: 'cell13'}, {text: 'cell14'}, {text: 'cell15'}, {text: 'cell16'}, {text: 'cell17'}, {text: 'cell18'}, {text: 'cell19'}, {text: 'cell20'}],
        [{text: 'cell21'}, {text: 'cell22'}, {text: 'cell23'}, {text: 'cell24'}, {text: 'cell25'}, {text: 'cell26'}, {text: 'cell27'}, {text: 'cell28'}, {text: 'cell29'}, {text: 'cell30'}]];

    public state = {
        tableHeaderViewText: '下拉刷新',
        tableFooterViewText: '上拉加载更多'
    };

    private mkTableView: any;
    
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.tableHeaderViewText != nextState.tableHeaderViewText || this.state.tableFooterViewText != nextState.tableFooterViewText;
    }
    
    // MKTableViewDataSource
    numberOfSectionsInTableView(tableView) {
        return 3;
    }
    
    numberOfRowsInSection(tableView, section) {
        return this.data[section].length;
    }

    cellForRowAtIndexPath(tableView, indexPath) {
        return indexPath.section == 0 && indexPath.row == 0 ?
            <CustomTableViewCell1 {...this.data[indexPath.section][indexPath.row]} /> :
            <CustomTableViewCell {...this.data[indexPath.section][indexPath.row]}/>
    }

    titleForHeaderInSection(tableView, section) {
        return 'title';
    }
    
    // MKTableViewDelegate
    heightForRowAtIndexPath(tableView, indexPath) {
        return indexPath.section == 0 && indexPath.row == 0 ? 200: 50;
    }

    heightForHeaderInSection(tableView, section) {
        return 30;
    }

    scrollViewDidScroll(tableView, contentOffset) {
        if (contentOffset.y >= 0) {
            this.setState({tableHeaderViewText:"松开刷新"})
        } else {
            this.setState({tableHeaderViewText:"下拉刷新"})
        }

        if (contentOffset.y < tableView.tableViewHeight - (tableView.contentViewHeight + 16)){
            this.setState({
                tableFooterViewText: "松开加载"
            });
        } else {
            this.setState({
                tableFooterViewText: "上拉加载更多"
            })
        }
    }

    scrollViewWillEndDragging(tableView, contentOffset) {
        if (contentOffset.y >= 0) {
            this.setState({
                tableHeaderViewText:"正在加载"
            });

            this.mkTableView = tableView;

            setTimeout(this.finishLoadData.bind(this), 2000);
        }


        if (contentOffset.y < tableView.tableViewHeight - tableView.contentViewHeight) {
            this.setState({
                tableFooterViewText:"正在加载"
            });

            this.mkTableView = tableView;

            setTimeout(this.finishLoadData.bind(this), 2000);
        }


    }

    finishLoadData() {
        this.mkTableView.resetPosition(true)
    }

    render() {
        return (
            <Provider store={store}>
                <MKTableView dataSource={this} delegate={this} tableHeaderView={true} tableFooterView={true} bounce={false} limitDisplayTopHeight={16} limitDisplayBottomHeight={16}>
                    <CustomTableHeaderView text={this.state.tableHeaderViewText} />
                    <CustomTableFooterView text={this.state.tableFooterViewText} />
                </MKTableView>
            </Provider>
        )
    }
}

export default TableViewContainer;