import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../components/breadCrumbs/Breadcrumbs';
import { Carousel } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { FaCartPlus, FaRegHeart, FaRegComments } from 'react-icons/fa';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCard from '../../components/reviewCard/ReviewCard';
import { addToWishList } from '../../actions/wishListActions';
import Footer from '../../components/footer/Footer'
import './ProductDetailsPage.css';


function ProductDetailsPage(props) {

    let location = useLocation();
    let history = useHistory();
    const { params: { name } } = props.match;

    const [ product, setProduct ] = useState({})
    const [ prevUrl, setPrevUrl ] = useState('')
    const [ subMenu, setSubMenu ] = useState('')
    const [ind, setInd] = useState(0);
    const [qty, setQty ] = useState(1)
    const [ color, setColor ] = useState('')
    const [ size, setSize ] = useState('')
    const [ amount, setAmount ] = useState(0)

    const { _id, image, brand, price, description, category, sca, reviews, delivery, discount, isnew } = product
    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;


    useEffect( () => {
        setProduct(props.location.state.prod)
        setPrevUrl(props.location.state.url_link)
    }, [])

    useEffect( () => {
        if ( size === '' & color === '') {
            const elem_color = document.querySelectorAll('.color-box')[0]
            const elem_size = document.querySelectorAll('.size-box')[0]
            if (elem_color) {
                elem_color.style.border = '2px solid black'
                setColor(elem_color.title)
            }
            if (elem_size) {
                elem_size.style.border = '2px solid black'
                setSize(elem_size.title)
            }
        }
        if (size !== '' & color !== '') {
            let amountProduct = sca.filter( item => (item.color === color & item.size === size)).map(item => Number(item.amount)).reduce((total, num) => total+ num, 0)
            amountProduct = Number(amountProduct)
            if (amountProduct > 0) {
                setAmount(amountProduct)
                setQty(1)  
            } else {
                setAmount(0)
            }
        } else if (color) {
            let amountProduct = sca.filter( item => item.color === color).map(item => Number(item.amount)).reduce((total, num) => total+ num, 0)
            amountProduct = Number(amountProduct)
            if (amountProduct > 0 ) {
                setAmount(amountProduct)  
                setQty(1) 
            } else {
                setAmount(0)
            }
        } else if (size) {
            let amountProduct = sca.filter( item => item.size === size).map(item => Number(item.amount)).reduce((total, num) => total+ num, 0)
            amountProduct = Number(amountProduct)
            if (amountProduct > 0) {
                setAmount(amountProduct)
                setQty(1) 
            } else {
                setAmount(0)
            }
        } 
    }, [color, size, product])


    const handleSelect = (selectedIndex) => {
        setInd(selectedIndex);
    };

    const handleAddToCart = () => {
        history.push("/cart/" + _id + "?qty=" + qty + "?color=" + color + "?size=" + size)
    }

    const dispatch = useDispatch();

    const handleAddToWishList = id => {
        dispatch(addToWishList(id))
    }

    const sub_menu = ['description', 'additional information', 'shipping', 'reviews'];
    const sca_color = sca ? [...new Set(sca.map(item => item.color))] : null
    const sca_size = sca ? [...new Set(sca.map(item => item.size))] : null

    return (
        <div className="details-container">
            <Breadcrumbs prev_url= { (prevUrl === '/search' || prevUrl === '/products' || prevUrl === '/wishlist' || prevUrl === '/cart') ? null : prevUrl } 
                         prev_title={ (prevUrl === '/search' || prevUrl === '/products' || prevUrl === '/wishlist' || prevUrl === '/cart') ? null : prevUrl.split('/')[2]} 
                         title={name} />
            <div className="details-box">
            {
                isnew && 
                    <div className='new'>
                        <img src="/images/new.png" alt="new product" width='50px' height='20px'/>
                    </div>
            }
                <div className="image-part">
                    { image && 
                        <Carousel activeIndex={ind} onSelect={handleSelect} >
                            {
                                image.map( (item, index) => 
                                    <Carousel.Item key={index}>
                                        <img
                                            id="main-pic-part"
                                            src={`/productsImages/${item}`}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>    
                                )
                            }
                        </Carousel>
                    }
                    <div className="other-images">
                        {   image ?
                            image.map( (item, index) => <img key={index}
                                                            src={`/productsImages/${item}`} 
                                                            alt="products"
                                                            onClick= { e => handleSelect(index)}/> 
                            )
                            : null
                        }
                    </div>
                </div>
                <div className="right-part">
                    <div className="brand">
                        {brand}
                    </div>
                    <div className="name">
                        {product.name}
                    </div>
                    <div className="price">
                        $ {discount > 0 ? <span><span>{price}</span><span style={{textDecoration: 'line-through', textDecorationColor: '#F60394', fontSize: '15px', color: 'grey', paddingLeft: '10px'}}>{Math.round(price * (100 + discount) / 100)}</span> <span style={{color: '#BE1B79', fontSize: '15px', paddingLeft: '5px'}}>%{discount}</span></span> : price }
                    </div>
                    <div className="rating">
                        <StarRatings  
                            rating = {reviews && reviews.length > 0 ? reviews.map( item => item.rating ).reduce((total, num) => total+ num, 0) / reviews.length : 0}
                            starRatedColor= '#f8a502'
                            starEmptyColor= 'lightblue'
                            numberOfStars= {5}
                            starDimension= '18px'
                            starSpacing= 'none'
                        /> 
                        <a href="#reviewSection">
                            <span onClick={() => setSubMenu('reviews')}>{reviews ? reviews.length : 0} reviews</span> 
                        </a>
                    </div>
                    <div className="description">
                        {description}
                    </div>
                    <div className="availability">
                        <span>Availability</span>: In Stock <span style={{color: '#BE1B79', fontSize: '15px', fontWeight: 'bold'}}>({amount} items)</span> 
                    </div>
                    <div className="category">
                        <span>Product-Type</span>: {category}
                    </div>
                    <div className="color">
                        <span>Color</span>
                       
                        <div className="color-outbox">
                            { 
                                sca_color ? sca_color.map( (item, index) =>  <div key={index} className="color-box" title={item} style={{ backgroundColor: item}} onClick={ e => {
                                                                                                                                        setColor(item)
                                                                                                                                        document.querySelectorAll('.color-box').forEach(item => item.style.border = '1px solid #d5d5d5')
                                                                                                                                        e.target.style.border = '2px solid black'
                                                                                                                                    }}>
                                                                            </div>
                                 ) : null
                            }    
                        </div>
                    </div>
                    <div className="size">
                        <span>Size</span>
                        <div className="size-outbox">
                            {
                                sca_size ? sca_size.map( (item, index) => <div key={index} className="size-box" title={item} onClick={ e => {
                                                                                                                                                setSize(item)
                                                                                                                                                document.querySelectorAll('.size-box').forEach(item => item.style.border = '1px solid #d5d5d5')
                                                                                                                                                e.target.style.border = '2px solid black'
                                                                                                                                            }}
                                                                            >{item}</div>
                                ) : null
                            }  
                        </div>
                    </div>
                    <div className="buttons-cart">
                        {
                            amount > 0 &&
                                <div className="buttons">
                                    <div onClick = {() => setQty(prevQty => {
                                                                                if (prevQty === 1) {
                                                                                    return 1
                                                                                } else {
                                                                                    return prevQty - 1
                                                                                }
                                                                            })}
                                    >-</div>
                                    <div>{qty}</div>
                                    <div onClick = {() => setQty(prevQty => {   
                                                                                if (prevQty === amount) {
                                                                                    return amount
                                                                                } else {
                                                                                    return prevQty + 1
                                                                                }
                                                                            })}
                                    >+</div> 
                                </div>
                        }
                        {   
                            amount > 0 && 
                                <div className="addCart" onClick={handleAddToCart}>
                                    <span><FaCartPlus /></span>Add to Cart
                                </div>
                        }
                        {
                            amount === 0 && 
                                <div className="addCart">
                                    NOT in Stock
                                </div>
                        }
                        <div className="addCart" onClick={() => handleAddToWishList(_id)}>
                            <span><FaRegHeart /></span> Add to WishList
                        </div>
                    </div>

                </div>
            </div>
            <div className="heading" id="reviewSection">
                {
                    sub_menu.map( (item,index) =>   <div className="heading-box" key={index}>
                                                        <div className="outer">
                                                            <div className="inner"></div>
                                                        </div>
                                                        <div className="submenu-item" key={index} onClick={ (e) =>   {
                                                                                                                        setSubMenu(item) 
                                                                                                                        document.querySelectorAll('.submenu-item').forEach(item => item.style.borderBottom = 'none')
                                                                                                                        e.target.style.borderBottom = '3px solid #BF1B79'
                                                                                                                        window.scrollTo(0,document.body.scrollHeight);
                                                                                                                    }}>{item}</div>
                                                    </div>
                    )
                }
            </div>
            <div>
                {
                    subMenu === 'reviews' && <div>
                                                <div className= "reviews-top">
                                                    <div className="left-review">
                                                        <StarRatings  
                                                            rating= {reviews.length > 0 ? reviews.map( item => item.rating ).reduce((total, num) => total+ num, 0) / reviews.length : 0}
                                                            starRatedColor= '#f8a502'
                                                            starEmptyColor= 'lightblue'
                                                            numberOfStars= {5}
                                                            starDimension= '18px'
                                                            starSpacing= 'none'
                                                        /> 
                                                        <span>( {reviews.length > 0 ? (reviews.map( item => item.rating ).reduce((total, num) => total+ num, 0) / reviews.length).toFixed(1) : 0} )</span>
                                                        <span>Based on {reviews.length} reviews</span>
                                                    </div>
                                                    {
                                                        userInfo ? 
                                                            <div className="addCart-review">
                                                                <Link to= {{
                                                                    pathname: `${location.pathname}/review`,
                                                                    state: {
                                                                        productId: product._id,
                                                                        url_link: location.pathname,
                                                                        review: {}
                                                                    }
                                                                }}
                                                                >
                                                                    <span><FaRegComments /></span> Write Review
                                                                </Link>
                                                            </div>
                                                        :
                                                        <div className="addCart-review">
                                                                <Link to="/signin">
                                                                    <span><FaRegComments /></span> Login to Write Review
                                                                </Link>
                                                            </div>

                                                    }
                                                </div>
                                                <hr/>
                                                {
                                                    reviews.sort( (a, b) => new Date(b.reviewedAt) - new Date(a.reviewedAt)).map( (item, index) => <ReviewCard key={index} {...item} /> )
                                                }
                                            </div>
                }
                {
                    subMenu === 'shipping' && 
                        <div>
                            <ul>
                                <li> Shipping is available <span style={{fontWeight: 'bold'}}>in {delivery}</span> </li>
                                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, ducimus architecto reprehenderit nesciunt impedit similique?</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ut.  </li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ut.  </li>
                            </ul>
                        </div>
                }
                {
                    subMenu === 'additional information' && 
                        <div>
                            <ul>
                                {description.split(',').map( (item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                }
                {
                    subMenu === 'description' && 
                        <div>
                            <ul>
                                {description.split(',').map( (item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                }
            </div>
            <Footer />
        </div>
        
    )
}

export default ProductDetailsPage;