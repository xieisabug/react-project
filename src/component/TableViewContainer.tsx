/**
 * Created by Gene on 16/4/8.
 */

import MKTableView from './MKTableView/MKTableView';
import MKTableViewCell from './MKTableView/MKTableViewCell';

class CustomTableViewCell extends MKTableViewCell {

    initializeSubviews() {
        const {text} = this.props;

        return (
            <div>{'TestCellContent' + text}</div>
        )
    }
}

class TableViewContainer extends React.Component<any, any> implements MkTableViewDataSource, MKTableViewDelegate {

    data = [[{text: 'cell1'}, {text: 'cell2'}, {text: 'cell3'}, {text: 'cell4'}, {text: 'cell5'}, {text: 'cell6'}, {text: 'cell7'}, {text: 'cell8'}, {text: 'cell9'}, {text: 'cell10'}],
        [{text: 'cell1'}, {text: 'cell2'}, {text: 'cell3'}, {text: 'cell4'}, {text: 'cell5'}, {text: 'cell6'}, {text: 'cell7'}, {text: 'cell8'}, {text: 'cell9'}, {text: 'cell10'}]];

    
    // MKTableViewDataSource
    numberOfSectionsInTableView(tableView) {
        return 2;
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
        return <MKTableView dataSource={this} delegate={this}/>
    }
}

export default TableViewContainer;