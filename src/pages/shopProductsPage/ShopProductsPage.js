import React, { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Heading from '../../components/heading/Heading';
import ProductCard from '../../components/productCard/ProductCard';
import Breadcrumbs from '../../components/breadCrumbs/Breadcrumbs';
import Pegination from '../../components/pegination/Pagination'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Switch from "react-switch";
import Fade from 'react-reveal/Fade';
import Footer from '../../components/footer/Footer';
import './ShopProductsPage.css';
import AlertModal from '../../components/alert/AlertModal'


function ShopProductsPage(props) {
    //console.log(props.match);
    const { params: { name } } = props.match;

    let tempProducts; 
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setproductsPerPage] = useState(5);
    const [ brand, setBrand ] = useState([]);
    const [ productsToShow, setProductsToShow ] = useState([]);
    const [ newChecked, setNewChecked ] = useState(false);
    const [ saleChecked, setSaleChecked ] = useState(false);
    const [ rangeBarValue, setRangeBarValue ] = useState({min: 0, max: 0});
    const [ alertShow, setAlertShow ] = useState(true)

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const shopList = useSelector(state => state.shopList);
    const { shops } = shopList;

    const shopFind = shops.find(item => item.name === name); 
    const shopProducts = shopFind ? products.filter( item => item.shop === shopFind._id) : null

    useEffect(() => {
        window.scrollTo(0, 0)
        tempProducts = shopProducts

        if (brand.length > 0) {
            tempProducts = tempProducts.filter( item => brand.includes(item.brand));
        }
        if (rangeBarValue.min === 0 & rangeBarValue.max === 0) {
            setRangeBarValue({...rangeBarValue, min: minPrice, max: maxPrice})
        } else if (tempProducts) {
            tempProducts = tempProducts.filter( item => (item.price >= rangeBarValue.min & item.price <= rangeBarValue.max));
        }
        if (newChecked) {
            tempProducts = tempProducts.filter( item => item.isnew === true);
        }
        if (saleChecked) {
            tempProducts = tempProducts.filter( item => item.discount > 0 );
        }
        if (tempProducts) {
            if (tempProducts.length > 0) {
                setProductsToShow(tempProducts)
                setCurrentPage(1);
            } else {
                setProductsToShow(tempProducts)
                setAlertShow(true)
            }
        }     
    }, [productsPerPage, brand, rangeBarValue, saleChecked, newChecked]);

    // options for filtering
    const optionsBrand = shopProducts ? [...new Set(shopProducts.map(item => item.brand))] : null
    const price = shopProducts ? [...new Set(shopProducts.map(item => item.price))] : null
    const minPrice = shopProducts ? Math.min(...price) : null
    const maxPrice = shopProducts ? Math.max(...price) : null

    // to manage brand filter part
    const brandHandler = e => {
        if (e.target.checked) {
            if (!brand.includes(e.target.value)) {
                setBrand([...brand, e.target.value])
            }
        } else {
            if (brand.includes(e.target.value)) {
                setBrand(brand.filter( item => item !== e.target.value ))
            }
        }
    }

    // Pagination 
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsToShow ? productsToShow.slice(indexOfFirstProduct, indexOfLastProduct) : null
    const paginate = pageNumber => setCurrentPage(pageNumber);

    
    
    return (
        <div className="shopproducts-container">
            <Breadcrumbs title={name} />

            <Heading head={ `Products of ${name}`}/>
            <div className="shop-products">
            <div className="filter-part">
            <div className="filterItem">
                <div className="topic">
                    <h5>Brand</h5>
                    {
                        brand.length > 0 &&
                        <Fade right>
                            <button type="button" onClick={() => {
                                                                    setBrand([])
                                                                    document.querySelectorAll('.brandShop-checkbox').forEach(item => item.checked = false)
                                                                    }
                                                            }
                            >clear</button>
                        </Fade>
                    }
                </div>
                <ul>
                    {
                        shopFind ? optionsBrand.map( (item, index) => <li key={index}>
                                                        <input type="checkbox" className="brandShop-checkbox" name={item} value={item} onChange={brandHandler}
                                                        id={"brandShop"+item}/>
                                                        <label htmlFor= {"brandShop"+item}>{item}</label>
                                                    </li> 
                        ) : null
                    }
                </ul>
            </div>
            <div className="filterItem">
                <h5>Price</h5>
                <div>
                    <InputRange
                            
                            maxValue={maxPrice}
                            minValue={minPrice}
                            onChange={value => {
                                setRangeBarValue({...rangeBarValue, min: value.min, max: value.max})
                            }}
                            onChangeComplete={value => console.log(value)}
                            value={ rangeBarValue } />
                </div>
            </div>
            <div className="filterItem">
                <h5>New Products</h5>
                <div>
                    <Switch onChange={ () => setNewChecked(!newChecked)} checked={newChecked} height={25} width={50} offColor='#B71D75'/>
                </div>
            </div>
            <div className="filterItem">
                <h5>Sale Products</h5>
                <div>
                    <Switch onChange={ () => setSaleChecked(!saleChecked)} checked={saleChecked} height={25} width={50} offColor='#B71D75'/>
                </div>
            </div>
        </div>
                <div className="products-part">
                    <div className="per-page">
                        <select onChange= { e => setproductsPerPage(e.target.value)} value={productsPerPage}>
                            <option value = '5'  >5 per Page</option>
                            <option value = '10' >10 per Page</option>
                            <option value = '15' >15 per Page</option>
                            <option value = '20' >20 per Page</option>
                        </select>
                    </div>
                    {
                        currentProducts.length === 0 ? <AlertModal show={alertShow} onHide={() => setAlertShow(false)} heading="Warning" text="No product with your search parameters...!" />  :
                        <React.Fragment>
                            <CardGroup>
                                {       
                                    currentProducts.map( item => <ProductCard key={item._id} {...item} />)
                                }    
                            </CardGroup>
                            <Pegination productsPerPage={productsPerPage} totalProducts={ productsToShow ? productsToShow.length : null} paginate={paginate}/>   
                        </React.Fragment>
                    }  
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default React.memo(ShopProductsPage);
