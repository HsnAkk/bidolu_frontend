import React, { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Heading from '../../components/heading/Heading';
import ProductCard from '../../components/productCard/ProductCard';
import Pegination from '../../components/pegination/Pagination'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Switch from "react-switch";
import Fade from 'react-reveal/Fade';
import './ProductPage.css';
import Footer from '../../components/footer/Footer';
import AlertModal from '../../components/alert/AlertModal'


function ProductsPage() {
    let minPrice;
    let maxPrice;
    let tempProducts;

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setproductsPerPage] = useState(5);
    const [ category, setCategory ] = useState([]);
    const [ brand, setBrand ] = useState([]);
    const [ productsToShow, setProductsToShow ] = useState([]);
    const [ newChecked, setNewChecked ] = useState(false);
    const [ saleChecked, setSaleChecked ] = useState(false);
    const [ rangeBarValue, setRangeBarValue ] = useState({min: 0, max: 0});
    const [ alertShow, setAlertShow ] = useState(true)
  
    const productList = useSelector(state => state.productList);
    const { products } = productList;

    tempProducts = products;

    useEffect(() => {

        if (rangeBarValue.min === 0 & rangeBarValue.max === 0) {
            setRangeBarValue({...rangeBarValue, min: minPrice, max: maxPrice})
        } else {
           
            if (category.length > 0 & brand.length === 0 ) {
                tempProducts = tempProducts.filter( item => category.includes(item.category));
            }
            if (category.length === 0 & brand.length > 0) {
                tempProducts =  tempProducts.filter( item => brand.includes(item.brand));
            }
            if (category.length > 0 & brand.length > 0) {
                tempProducts = tempProducts.filter(item => category.includes(item.category)).filter( item => brand.includes(item.brand));
            }
            if (rangeBarValue) {
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
        }

    }, [category, productsPerPage, brand, rangeBarValue, newChecked, saleChecked]);

    // options for filtering
    const optionsCategory = [...new Set(products.map(item => item.category))]
    const optionsBrand = [...new Set(products.map(item => item.brand))]
    const price = [...new Set(products.map(item => item.price))]
    minPrice = Math.min(...price)
    maxPrice = Math.max(...price)

    // to manage category filter part
    const categoryHandler = e => {
        if (e.target.checked) {
            if (!category.includes(e.target.value)) {
                setCategory([...category, e.target.value])
            }
        } else {
            if (category.includes(e.target.value)) {
                setCategory(category.filter( item => item !== e.target.value ))
            }
        }
    }

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
    const currentProducts = productsToShow ? productsToShow.slice(indexOfFirstProduct, indexOfLastProduct): null
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div className="productPage-container">
            <Heading head="All Products"/>
            <div className="products">
                <div className="filter-part">
                    <div className="filterItem">
                        <div className="topic">
                            <h5>Category</h5>
                            {
                                category.length > 0 &&
                                <Fade right>
                                    <button type="button" onClick={() => {
                                                                        setCategory([])
                                                                        document.querySelectorAll('.categoryProduct-checkbox').forEach(item => item.checked = false)
                                                                        }
                                                                    }
                                    >clear</button>
                                </Fade>
                            }
                        </div>
                        <ul>
                            {
                                optionsCategory.map( (item, index) => <li key={index}>
                                                                <input type="checkbox" name="category" value={item} onChange={categoryHandler} className="categoryProduct-checkbox"
                                                                id={"categoryProduct"+item}
                                                                />
                                                                <label htmlFor= {"categoryProduct"+item}> {' '}{item}</label>
                                                             </li> 
                                )
                            }
                        </ul>
                    </div>
                    <div className="filterItem">
                        <div className="topic">
                            <h5>Brand</h5>
                            {
                                brand.length > 0 &&
                                <Fade right>
                                    <button type="button" onClick={() => {
                                                                            setBrand([])
                                                                            document.querySelectorAll('.brandProduct-checkbox').forEach(item => item.checked = false)
                                                                            }
                                                                    }
                                    >clear</button>
                                </Fade>
                            }
                        </div>
                        <ul>
                            {
                                optionsBrand.map( (item, index) => <li key={index}>
                                                                <input type="checkbox" name="brand" value={item} onChange={brandHandler} 
                                                                id={"brandProduct"+item}
                                                                className="brandProduct-checkbox"/>
                                                                <label htmlFor= {"brandProduct"+item}>{item}</label>
                                                             </li> 
                                )
                            }
                        </ul>
                    </div>
                    <div className="filterItem">
                        <h5>Price</h5>
                        <div>
                            <InputRange
                                className="rangeBar"
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
                            <Switch onChange={ () => setNewChecked(!newChecked)} checked={newChecked} height={20} width={40} offColor='#B71D75'/>
                        </div>
                    </div>
                    <div className="filterItem">
                        <h5>Sale Products</h5>
                        <div>
                            <Switch onChange={ () => setSaleChecked(!saleChecked)} checked={saleChecked} height={20} width={40}offColor='#B71D75'/>
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

export default React.memo(ProductsPage);
