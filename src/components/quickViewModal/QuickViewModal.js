import React, {useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { FaCartPlus } from 'react-icons/fa';
import './QuickViewModal.css';


function QuickViewModal({show, onHide, ...items }){

    let history = useHistory();

    const [ qty, setQty ] = useState(1)
    const [ color, setColor ] = useState('')
    const [ size, setSize ] = useState('')
    const [ amount, setAmount ] = useState(0)

    const {_id, image, name, price, brand, category, sca, reviews, isnew, discount  } = items;

    useEffect( () => {
        if ( size === '' & color === '' ) {
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
            if (amountProduct > 0) {
                setAmount(amountProduct)
            } else {
                setAmount(0)
                setQty(1)
            }
        } else if (color) {
            let amountProduct = sca.filter( item => item.color === color).map(item => Number(item.amount)).reduce((total, num) => total+ num, 0)
            if (amountProduct > 0 ) {
                setAmount(amountProduct)  
               
            } else {
                setAmount(0)
            }
        } else if (size) {
            let amountProduct = sca.filter( item => item.size === size).map(item => Number(item.amount)).reduce((total, num) => total+ num, 0)
            if (amountProduct > 0) {
                setAmount(amountProduct)
    
            } else {
                setAmount(0)
            }
        } 
    }, [sca, color, size, items])

    let reviewLength = 0;
    let reviewRating = 0;
    let productRating = 0;
    reviews.forEach( item => {
                    reviewLength += 1
                    reviewRating += item.rating
                    })
    productRating = (reviewLength > 0 ? (reviewRating / reviewLength) : 0)

    const handleAddToCart = () => {
        history.push("/cart/" + _id + "?qty=" + qty + "?color=" + color + "?size=" + size)
    }

    const sca_color = sca ? [...new Set(sca.map(item => item.color))] : null
    const sca_size = sca ? [...new Set(sca.map(item => item.size))] : null

    return (
        <Modal
            show = {show}
            onHide = {onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className = "modal-container"
            >
            <Modal.Header closeButton className="modal-header"></Modal.Header>
            <Modal.Body className="modal-body">
                <div className="left-part">
                    {
                        isnew && 
                            <div className='new'>
                                <img src="/images/new.png" alt="new product" width='50px' height='20px'/>
                            </div>
                    }
                    <img id="main-pic" src={`/productsImages/${image[0]}`} alt="productImage"  />
                    <div className="other-images">
                        {
                            image.map( (item, index) => <img key={index}
                                                             src={`/productsImages/${item}`} 
                                                             alt="products"
                                                             onClick= { e => document.getElementById('main-pic').src = e.target.src} /> 
                            )
                        }
                    </div>
                </div>
                
                <div className="right-part">
                    <div className="brand">
                        {brand}
                    </div>
                    <div className="name">
                        {name}
                    </div>
                    <div className="price">
                    $ {discount > 0 ? <span><span>{price}</span><span style={{textDecoration: 'line-through', textDecorationColor: '#F60394', fontSize: '15px', color: 'grey', paddingLeft: '10px'}}>{Math.round(price * (100 + discount) / 100)}</span> <span style={{color: '#BE1B79', fontSize: '15px', paddingLeft: '5px'}}>%{discount}</span></span> : price }
                    </div>
                    <div className="rating">
                        <StarRatings  
                            rating= {productRating}
                            starRatedColor= '#f8a502'
                            starEmptyColor= 'lightblue'
                            numberOfStars= {5}
                            starDimension= '18px'
                            starSpacing= 'none'
                        /> 
                        <span>{reviews.length} reviews</span> 
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
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default React.memo(QuickViewModal);
