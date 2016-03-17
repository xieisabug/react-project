/**
 * Created by Gene on 16/3/11.
 */

class SearchBar extends React.Component<any, any> {


    handleChange = () => {

        const { onUserInput } = this.props;

        onUserInput(
            this.refs['filterTextInput']['value'],
            this.refs['inStockOnlyInput']['checked']
        );
    };

    render() {
        const { filterText, inStockOnly } = this.props;
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange.bind(this)}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        ref="inStockOnlyInput"
                        onChange={this.handleChange.bind(this)}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

export default SearchBar;