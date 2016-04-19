/**
 * Created by Gene on 16/4/8.
 */

require('./MKTableView.sass');

import ReactInstance = __React.ReactInstance;

import objectAssign = require('object-assign');
import MKTableViewScroll from './MKTableViewScroll';

interface MKTableViewProps {
    dataSource?: MkTableViewDataSource;
    delegate?: MKTableViewDelegate;
    tableHeaderView?: boolean;
    tableFooterView?: boolean;
    scrollContainerHeight?: number;
    scrollContentHeight?: number;
    limitDisplayTopHeight?: number;
    limitDisplayBottomHeight?: number;
    minPointY?: number;
    maxPointY?: number;
    bounce?: boolean;
}


interface MKTableViewScrollInterface extends ReactInstance {
    initializeScrollBar?: Function;
    setScrollOpacity?: Function;
    setScrollTranslateY?: Function
}

class MKTableView extends React.Component<MKTableViewProps, any> {


    private dataSource: MkTableViewDataSource;
    private delegate: MKTableViewDelegate;

    private scrollBar: MKTableViewScrollInterface;
    private startPointY: number = 0;
    private startTranslateY: number = 0;
    private startTime: number = 0;
    private lastTranslateY: number = 0;
    private needScrollBar: boolean = true;
    private limitDisplayTopHeight: number = 0;
    private limitDisplayBottomHeight: number = 0;
    private minPointY: number = 0;
    private maxPointY: number = 0;
    private endTranslateY: number = 0;
    private scrollStyle: any;
    private dampingForceLevel: number = 3;
    private timer: number;
    private bounce: boolean = true;
    private tableViewStyle: Object;

    public tableViewHeight: number = 0;
    public contentViewHeight: number = 0;

    componentWillMount() {
        
        this.dataSource = this.props.dataSource;
        this.delegate = this.props.delegate;
        this.bounce = typeof this.props.bounce == 'boolean' ? this.props.bounce : this.bounce;
    }

    componentDidMount() {
        const { limitDisplayTopHeight, limitDisplayBottomHeight } = this.props;
        const { mkTableViewContainer, mkTableView } = this.refs;

        let scrollContainerHeight: number = mkTableViewContainer['offsetHeight'];
        let scrollContentHeight: number = mkTableView['offsetHeight'];
        let tableViewStyle: Object = {
            WebkitTransitionDuration: "0ms",
            WebkitTransform: "translate(0px, 0px) translateZ(0px)",
            WebkitTransitionTimingFunction: "cubic-bezier(0.1, 0.57, 0.1, 1)"

        };

        this.tableViewHeight = scrollContainerHeight;
        this.contentViewHeight = scrollContentHeight;
        this.limitDisplayBottomHeight = limitDisplayBottomHeight || 0;
        this.limitDisplayTopHeight = limitDisplayTopHeight || 0;
        this.maxPointY = limitDisplayTopHeight || this.maxPointY;
        this.minPointY = scrollContainerHeight - (scrollContentHeight - this.limitDisplayBottomHeight);
        this.minPointY = this.minPointY > 0 ? (tableViewStyle['height'] = scrollContainerHeight +'px') && 0 : this.minPointY;
        this.needScrollBar = scrollContentHeight > scrollContainerHeight;

        this.endTranslateY = this.maxPointY * -1;

        this.tableViewStyle = objectAssign({}, tableViewStyle);

        window.addEventListener('touchmove', this.touchMove.bind(this), false);
        window.addEventListener('touchend', this.touchEnd, false);

        this.scrollStyle = this.refs['mkTableView']['style'];
        this.scrollBar = this.refs['tableViewScroll'];
        
        this.scrollBar.initializeScrollBar(scrollContainerHeight, scrollContentHeight);
    }


    private renderTableView() {


        let sectionCount: number = 1;
        let cells = [];

        if ( !this.dataSource ) {
            return ;
        }

        if (this.dataSource.numberOfSectionsInTableView) {
            sectionCount = this.dataSource.numberOfSectionsInTableView(this);
        }

        this.renderTableViewSections(this.dataSource, this.delegate, sectionCount, cells);

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
                'lineHeight': height+'px'
            };

            if ( delegate && delegate['viewFor' + type + 'InSection'] ) {
                view = <li style={style} key={type + index}>{delegate['viewFor' + type + 'InSection'](this, index)}</li>
            } else if (dataSource['titleFor' + type + 'InSection']) {
                title = dataSource['titleFor' + type + 'InSection'](this, index);

                view = <li style={style} key={type + index}>{title}</li>
            } else {
                view = <li style={style} key={type + index} />
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
            style['lineHeight'] = height;
        }

        style['height'] = height;

        cells.push(
            <li className="mk_table_view_cell" style={style} key={section + '' + row}>
                {dataSource.cellForRowAtIndexPath(this, {section, row})}
            </li>
        );
    }

    private touchStart = (event) => {
        event.preventDefault();

        this.startPointY = event.touches[0].clientY;
        this.startTranslateY = this.lastTranslateY;
        this.startTime = event.timeStamp ;

        if (this.needScrollBar) {

            this.scrollBar.setScrollOpacity(1);
        }
    };

    private touchMove = (event) => {

        event.preventDefault();

        let currentPointY = event.touches[0].clientY;
        let distY = currentPointY - this.startPointY;
        let translateY = distY + this.endTranslateY;

        if ((event.timeStamp - this.startTime > 300 && Math.abs(distY) < 10) ) {
            return;
        }

        if(translateY <= this.maxPointY && translateY > this.minPointY) {

            let scrollTop = translateY / this.minPointY;


            this.scrollBar.setScrollTranslateY(scrollTop, 0);

        } else if(translateY >= this.maxPointY) {
            translateY = this.maxPointY + (translateY - this.maxPointY) / (this.dampingForceLevel + (translateY / (this.tableViewHeight * 0.5)));


            this.scrollBar.setScrollTranslateY(0, 0);

        } else {
            translateY = Math.abs(translateY) + this.minPointY;
            translateY = this.minPointY - translateY / (this.dampingForceLevel + (translateY / (this.tableViewHeight * 0.5)));

            this.scrollBar.setScrollTranslateY(1, 0);
        }

        this.lastTranslateY = translateY;


        if (this.delegate && this.delegate.scrollViewDidScroll) {
            this.delegate.scrollViewDidScroll(this, {x:0, y:translateY});
        }

        this.refs['mkTableView']['style']['webkitTransitionDuration'] = "0ms";
        this.refs['mkTableView']['style']['webkitTransform'] = "translate(0px, " + translateY + "px) translateZ(0px)";

    };

    private touchEnd = (event) => {

        if (this.needScrollBar) {
            this.scrollBar.setScrollOpacity(0);
        }

        if (this.timer) {
            clearTimeout(this.timer);
        } else {
            event.preventDefault();
        }

        let {endTranslateY, reset} = this.resetPosition(this.bounce);

        let duration = event.timeStamp - this.startTime;

        if (!reset && duration < 300) {

            let distance = endTranslateY - this.startTranslateY;
            let time = event.timeStamp - this.startTime;
            let speed = Math.abs(distance) / time;
            let deceleration = 0.0006;
            let destination = Math.round(endTranslateY + (speed * speed) / (2 * deceleration) * ( distance < 0 ? -1 : 1 ));

            duration = speed / deceleration;

            if (destination < this.minPointY) {
                destination = this.tableViewHeight ? this.minPointY - ( this.tableViewHeight / 2.5 * ( speed / 8 ) ) : this.minPointY;
                distance = Math.abs(destination - endTranslateY);
                duration = distance / speed;

                this.timer = setTimeout(() => {
                    this.touchEnd(event);
                }, duration);
            } else if ( destination > 0 ) {
                destination = this.tableViewHeight ? this.tableViewHeight / 2.5 * ( speed / 8 ) : 0;
                distance = Math.abs(endTranslateY) + destination;
                duration = distance / speed;

                this.timer = setTimeout(() => {
                    this.touchEnd(event);
                }, duration);
            }

            this.endTranslateY = this.lastTranslateY = endTranslateY = destination;

            if (destination > 0) {
                destination = 0;
            } else if (destination < this.minPointY) {
                destination = this.minPointY;
            }


            this.scrollBar.setScrollTranslateY(destination / this.minPointY, duration);

            this.scrollStyle['webkitTransitionDuration'] = duration+"ms";
            this.scrollStyle['webkitTransform'] = "translate(0px, " + destination + "px) translateZ(0px)";
        }

        if (this.delegate && this.delegate.scrollViewWillEndDragging) {
            this.delegate.scrollViewWillEndDragging(this, {x:0,y:endTranslateY});
        }
    };

    public resetPosition(bounce) {

        let endTranslateY = this.lastTranslateY;
        let maxPointY = bounce ? this.maxPointY : 0;
        let minPointY = bounce ? this.minPointY : this.minPointY - this.limitDisplayBottomHeight;

        if (endTranslateY >= maxPointY || bounce ?
            endTranslateY >= maxPointY * -1 :
            endTranslateY <= 0 && endTranslateY >= this.limitDisplayTopHeight * -1 && (maxPointY = this.limitDisplayTopHeight)) {

            this.scrollStyle['webkitTransitionDuration'] = "600ms";
            this.scrollStyle['webkitTransform'] = "translate(0px, -"+maxPointY+"px) translateZ(0px)";

            this.endTranslateY = maxPointY * -1;
            return {endTranslateY, reset:true};
        } else if (endTranslateY <= minPointY || !bounce && endTranslateY < this.minPointY && endTranslateY > this.minPointY - this.limitDisplayBottomHeight && (minPointY = this.minPointY )){

            this.scrollStyle['webkitTransitionDuration'] = "600ms";
            this.scrollStyle['webkitTransform'] = "translate(0px, " + minPointY + "px) translateZ(0px)";

            this.endTranslateY = minPointY;
            return {endTranslateY, reset:true};
        }

        this.endTranslateY = endTranslateY;

        return {endTranslateY, reset:false};
    }

    renderScrollBar() {

        const { scrollContainerHeight, scrollContentHeight } = this.props;

        return (
            <MKTableViewScroll
                scrollContainerHeight={scrollContainerHeight}
                scrollContentHeight={scrollContentHeight}
                ref="tableViewScroll"
            />
        );
    }

    render() {

        const { tableHeaderView, tableFooterView } = this.props;

        return (
            <div className="mk_table_view_container" ref="mkTableViewContainer">
                <div style={this.tableViewStyle} ref="mkTableView" onTouchStart={this.touchStart}>
                    <ul className="mk_table_view">
                        {tableHeaderView && (this.props.children[0] || this.props.children)}
                        {this.renderTableView()}
                        {tableHeaderView && tableFooterView ? this.props.children[1] : tableFooterView && this.props.children}
                    </ul>
                </div>
                {this.renderScrollBar()}
            </div>
        )
    }
}

export default MKTableView;