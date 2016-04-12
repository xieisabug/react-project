/**
 * Created by Gene on 16/4/11.
 */

class MKTableViewScroll extends React.Component<any, any> {

    private scrollHeight: number;

    private surplusHeight: number;
    
    private scrollTop: number = 0;

    private scrollContainerStyle: Object;

    private scrollStyle: Object;

    initializeScroll = () => {
        const { scrollContainerHeight, scrollContentHeight, scrollTopPercent, showScrollBar} = this.props;

        if (scrollContainerHeight != 0) {

            let scrollHeightPercent = scrollContainerHeight / scrollContentHeight;

            this.scrollHeight = scrollContainerHeight * scrollHeightPercent;

            this.surplusHeight = scrollContainerHeight - this.scrollHeight;

            this.scrollContainerStyle = {
                height : scrollContainerHeight + 'px'
            };

            this.scrollStyle = {
                height : this.scrollHeight + 'px'
            };
        }

        if (scrollTopPercent != 0) {
            this.scrollTop = this.surplusHeight * scrollTopPercent;
            this.scrollStyle['marginTop'] = this.scrollTop + 'px';
        }

        if (this.scrollStyle) {
            this.scrollStyle['opacity'] = showScrollBar ? 1 : 0;

            this.scrollStyle['transitionDelay'] = showScrollBar ? "0s" : ".5s";
        }


    };

    render() {
        
        this.initializeScroll();

        return (
            <div className="mk_table_view_scroll_container" style={this.scrollContainerStyle}>
                <div className="mk_table_view_scroll" style={this.scrollStyle}></div>
            </div>
        )
    }
}

export default MKTableViewScroll;