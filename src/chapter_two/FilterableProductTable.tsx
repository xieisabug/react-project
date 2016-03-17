/**
 * Created by Gene on 16/3/11.
 */

import SearchBar from './SearchBar';
import ProductTable from './ProductTable'

class FilterableProductTable extends React.Component<any, any> {


    render() {
        const {products} = this.props;

        return (
            <div>
                <SearchBar />
                <ProductTable products={products} />
            </div>
        )
    }
}

export default FilterableProductTable;