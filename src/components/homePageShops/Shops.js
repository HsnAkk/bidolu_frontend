import React, {useState, useEffect} from 'react';
import ShopCard from '../shopCard/ShopCard';
import { useDispatch, useSelector } from 'react-redux';
import { listShop } from '../../actions/shopActions';
import { Spinner } from 'react-bootstrap';
import Pegination from '../../components/pegination/Pagination';
import Heading from '../../components/heading/Heading';
import './Shops.css';

function Shops(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [shopsPerPage, setShopsPerPage] = useState(5);
    const [ category, setCategory ] = useState('')

    const shopList = useSelector(state => state.shopList);
    const { shops, loading, error } = shopList;

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(listShop());
    }, [])

    // Pagination 
    const indexOfLastShop = currentPage * shopsPerPage;
    const indexOfFirstShop = indexOfLastShop - shopsPerPage;
    const totalShops = (category === '' || category === 'All Categories') ? shops : shops.filter( item => item.category === category);
    const currentShops = totalShops.slice(indexOfFirstShop, indexOfLastShop);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // options for filtering by category 
    const options = [...new Set(shops.map(item => item.category))]

    return (
        <div className="shops-container">
            <Heading head="Shops"/>
            <div className="filter-part">
                <div className="per-page">
                    <select onChange= { e => setCategory(e.target.value)} value={category}>
                        <option>All Categories</option>
                        {
                            options.map( (item, index) => <option key={index} >{item}</option>)
                        }
                    </select>
                </div>
                {
                    shops && 
                    <div className="per-page">
                        <select onChange= { e => setShopsPerPage(e.target.value)} value={shopsPerPage}>
                            <option value = '5'  >5 per Page</option>
                            <option value = '10' >10 per Page</option>
                            <option value = '15' >15 per Page</option>
                            <option value = '20' >20 per Page</option>
                        </select>
                    </div>
                }   
            </div>
            <div className="shops-details">
                
                {loading && <Spinner animation="border" variant="danger" /> }
                {error && <div>{error}</div> }
                {
                    currentShops.map( item => <ShopCard key={item._id} {...item} /> )
                }
                <Pegination home productsPerPage={shopsPerPage} totalProducts={totalShops.length} paginate={paginate}/>        
            </div>
        </div>
    )
}

export default Shops
