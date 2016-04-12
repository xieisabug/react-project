/**
 * Created by Gene on 16/4/8.
 */

interface ContentOffset {
    x:number;
    y:number;
}

interface MKTableViewDelegate {
    heightForRowAtIndexPath?(tableView: ReactElement<any>, indexPath: IndexPath): number;
    heightForHeaderInSection?(tableView: ReactElement<any>, section: number): number;
    heightForFooterInSection?(tableView: ReactElement<any>, section: number): number;
    viewForHeaderInSection?(tableView: ReactElement<any>, section: number): ReactElement<any>;
    viewForFooterInSection?(tableView: ReactElement<any>, section: number): ReactElement<any>;

    willDisplayCellForRowAtIndexPath?(tableView: ReactElement<any>, cell: ReactElement<any>, indexPath: IndexPath): void;
    willDisplayHeaderViewForSection?(tableView: ReactElement<any>, view: ReactElement<any>, section: number): void;
    willDisplayFooterViewForSection?(tableView: ReactElement<any>, view: ReactElement<any>, section: number): void;

    // todo 应该是UIScrollViewDelegate的方法
    scrollViewDidScroll?(tableView: ReactElement<any>|any, contentOffset: ContentOffset)
    scrollViewWillEndDragging?(tableView: ReactElement<any>|any, contentOffset: ContentOffset)
}