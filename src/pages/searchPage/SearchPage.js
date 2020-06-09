import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { CardGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listProduct } from '../../actions/productActions';
import ProductCard from '../../components/productCard/ProductCard';
import AlertModal from '../../components/alert/AlertModal'
import './SearchPage.css';


function SearchPage(props) {

    const [ alertShow, setAlertShow ] = useState(true)
    let history = useHistory();

    //console.log(props.location.search)
    const category = props.location.search.split('&')[0].split('=')[1];
    const searchItem = props.location.search.split('&')[1].split('=')[1];
    // console.log(category)
    // console.log(searchItem)

    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProduct());
        if (alertShow === false) {
            history.push('/')
        }
    }, [alertShow]);

    return (
        <div className="container-search">
            <CardGroup>
                {
                    category && searchItem 
                        ? 
                            products.filter( item => item.category === category & (item.name.toLowerCase()).includes(searchItem.toLowerCase())).length > 0 
                            ?
                            products.filter( item => item.category === category & (item.name.toLowerCase()).includes(searchItem.toLowerCase())).map( item => <ProductCard key={item._id} search {...item} /> )
                            : 
                            <AlertModal show={alertShow} onHide={() => setAlertShow(false)} heading="Warning" text="No product with your search parameters...!" />
                        :
                        category
                            ? 
                            products.filter( item => item.category === category ).map( item => <ProductCard key={item._id} search {...item} /> )
                            : 
                            searchItem
                                ? 
                                    products.filter( item => (item.name.toLowerCase()).includes(searchItem.toLowerCase())).length > 0 
                                    ?
                                    products.filter( item => (item.name.toLowerCase()).includes(searchItem.toLowerCase()) ).map( item => <ProductCard key={item._id} search {...item} /> )
                                    :
                                    <AlertModal show={alertShow} onHide={() => setAlertShow(false)} heading="Warning" text="No product with your search parameters...!" />
                                :
                                null
                }    
            </CardGroup>
        </div>
    )
}

export default SearchPage
