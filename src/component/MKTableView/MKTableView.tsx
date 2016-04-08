/**
 * Created by Gene on 16/4/8.
 */

require('./MKTableView.sass');

interface MKTableViewProps {
    dataSource?: MkTableViewDataSource
    delegate?: MKTableViewDelegate
}

class MKTableView extends React.Component<MKTableViewProps, any> {


    private renderTableView() {
        const { dataSource, delegate } = this.props;

        let sectionCount: number = 1;
        let cells = [];

        if ( !dataSource ) {
            return ;
        }

        if (dataSource.numberOfSectionsInTableView) {
            sectionCount = dataSource.numberOfSectionsInTableView(this);
        }

        this.renderTableViewSections(dataSource, delegate, sectionCount, cells);

        return cells;
    }

    private renderTableViewSections(dataSource, delegate, sectionCount, cells) {
        
        for ( let i = 0; i < sectionCount; i++ ) {
            this.renderTableViewSection(dataSource, delegate, cells, i);
        }
        
    }

    private renderTableViewSection(dataSource, delegate, cells, index) {
        let sectionHeaderView = this.renderTableViewSectionHeaderOrFooter(dataSource, delegate, index, 'Header');

        if (sectionHeaderView) {
            cells.push(sectionHeaderView);
        }

        this.renderTableViewRows(dataSource, delegate, cells, index);

        let sectionFooterView = this.renderTableViewSectionHeaderOrFooter(dataSource, delegate, index, 'Footer');

        if (sectionFooterView) {
            cells.push(sectionFooterView);
        }
    }

    private renderTableViewSectionHeaderOrFooter(dataSource, delegate,  index, type) {
        let view: ReactElement<any>;
        let title: string = '';
        let style: Object;

        if ( delegate && delegate['heightFor' + type + 'InSection'] ) {

            let height = delegate['heightFor' + type + 'InSection'](this, index);

            style = {
                'height': height+'px',
                'line-height': height+'px'
            };

            if ( delegate && delegate['viewFor' + type + 'InSection'] ) {
                view = <li style={style}>{delegate['viewFor' + type + 'InSection'](this, index)}</li>
            } else if (dataSource['titleFor' + type + 'InSection']) {
                title = dataSource['titleFor' + type + 'InSection'](this, index);

                view = <li style={style}>{title}</li>
            } else {
                view = <li style={style} />
            }
        }

        return view;
    }

    private renderTableViewRows(dataSource, delegate, cells, section) {

        let rowsCount: number = dataSource.numberOfRowsInSection(this, section);

        for ( let i = 0; i < rowsCount; i++ ) {
            this.renderTableViewRow(dataSource, delegate, cells, section, i);
        }
    }

    private renderTableViewRow(dataSource, delegate, cells, section, row) {
        let height = '80px';
        let style = {};

        if (delegate && delegate.heightForRowAtIndexPath) {
            height = delegate.heightForRowAtIndexPath({section,row}) + 'px';
            style['line-height'] = height;
        }

        style['height'] = height;

        cells.push(
            <li className="mk_table_view_cell" style={style}>
                {dataSource.cellForRowAtIndexPath(this, {section, row})}
            </li>
        );
    }

    render() {

        this.renderTableView();

        return (
            <div className="mk_table_view_container">
                <ul className="mk_table_view">
                    {this.renderTableView()}
                </ul>
            </div>
        )
    }
}

export default MKTableView;