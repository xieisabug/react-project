/**
 * Created by Gene on 16/3/11.
 */

class SearchBar extends React.Component<any, any> {
    render() {
        const { filterText, inStockOnly } = this.props;
        return (
            <form>
                <input type="text" placeholder="Search..." value={filterText}/>
                <p>
                    <input type="checkbox" checked={inStockOnly}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        )
    }
}

export default SearchBar;