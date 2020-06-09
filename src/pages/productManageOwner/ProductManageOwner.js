import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProduct, deleteProduct } from '../../actions/productActions';
import { listShop } from '../../actions/shopActions';
import FormData from "form-data";
import { Spinner } from 'react-bootstrap';
import './ProductManageOwner.css';

function ProductManageOwner(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const shopList = useSelector(state => state.shopList);
    const { shops } = shopList;

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [shop, setShop] = useState('');
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [inStock, setInStock] = useState(false);
    const [isnew, setIsnew] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [delivery, setDelivery] = useState('1 to 3 days');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [amount, setAmount] = useState(0);
    const [sca, setSca] = useState([]);
    const [files, setFiles] = useState(null);
    const [description, setDescription] = useState('');
    const [preShop, setPreShop] = useState('');
    
    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { success: successDelete } = productDelete;


    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listShop());
        dispatch(listProduct());
        
  }, [successSave, successDelete]);

  const openModal = product => {
    setModalVisible(true);
    setId(product._id);
    setShop(product.shop);
    setName(product.name);
    setBrand(product.brand);
    setPrice(product.price);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setInStock(product.inStock);
    setIsnew(product.isnew);
    setDiscount(product.discount);
    setDelivery(product.delivery);
    setSca(product.sca);
    setDescription(product.description);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    //console.log('files ', files)
    console.log('sca from submit :' , sca)
    const formData = new FormData();

    if (files !== null) {
        for(var i = 0; i<files.length; i++) {
            formData.append('file', files[i])
        }
    }
    formData.append("shop", shop);
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("inStock", inStock);
    formData.append("isnew", isnew);
    formData.append("discount", discount);
    formData.append("delivery", delivery);
    formData.append("sca", JSON.stringify(sca));
    formData.append("description", description);
    
 
    if (!id) {
        dispatch(saveProduct(formData))
        setFiles(null)
    } else {
        dispatch(saveProduct({_id: id, formData}))
        setFiles(null)
    }
  }

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  }

  const shopsOfOwner = shops.filter( item => item.owner === userInfo._id);
  
  const sizeOptions = ['Standard', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '36','37','38','39','40','41','42','43','44','45','46']
  const colorOptions = ['Aqua', 'Azure', 'Beige', 'Black', 'Blue', 'BlueViolet', 'Brown', 'Chocolate', 'Coral', 'Crimson', 'Cyan', 'DarkBlue', 'DeepSkyBlue', 'Gold',
                        'Gray', 'Green', 'Indigo', 'LightBlue', 'Lime', 'Magenta', 'Olive', 'Orange', 'Orchid', 'OrangeRed', 'Pink', 'Purple', 'Red', 'Salmon', 'Silver',
                        'Tomato', 'Violet', 'White', 'Wheat', 'Yellow', 'YellowGreen', 'WhiteSmoke']
  const categoryOptions = ['Bag', 'Shoe', 'Glasses', 'Accessory', 'Watch', 'Perfume'] 

  return (
  
    <div className="content-margined">
        <div className="product-header">
            <h4>Products</h4>
            <button className="button primary" onClick={() => openModal({})}>Create Product</button>
        </div>
        {
            modalVisible && (
                <div className="form">
                    <form onSubmit={submitHandler} encType="multipart/form-data">
                        <ul className="form-container">
                            <li>
                                <h4>Create Product</h4>
                            </li>
                            <li>
                                {loadingSave && <Spinner animation="border" variant="danger" />}
                                {errorSave && <div>{errorSave}</div>}
                            </li>
                            <li>
                                <label htmlFor="shop">
                                    Shop
                                </label>
                                <select name="shop" value={shop} id="shop" onChange={ e => setShop(e.target.value) } >
                                    <option>Select Shop</option>
                                    {
                                        shopsOfOwner.map( (item, index) => <option key={index}> {item._id}</option>)
                                    }
                                </select>
                            </li>
                            <li>
                                <label htmlFor="name">
                                    Name
                                </label>
                                <input type="text" name="name" value={name || '' } id="name" onChange={ e => setName(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="brand">
                                    Brand
                                </label>
                                <input type="text" name="brand" value={brand || ''} id="brand" onChange={ e => setBrand(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="price">
                                    Price
                                </label>
                                <input type="Number" name="price" value={price || ''} id="price" onChange={ e => setPrice(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="category">
                                    Category
                                </label>
                                <select name="category" id="category" value={category} onChange={ e => setCategory(e.target.value)} >
                                    <option>Category</option>
                                    {
                                        categoryOptions.map( (item, index) => <option key={index}>{item}</option>)
                                    }
                                </select>
                            </li>
                            <li>
                                <label htmlFor="countInStock">
                                    Count in Stock
                                </label>
                                <input type="Number" name="countInStock" value={countInStock || ''} id="countInStock" onChange={ e => setCountInStock(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="inStock">
                                    In Stock?
                                </label>
                                <input type="checkbox" name="inStock" checked={inStock || false} id="inStock" onChange={ e => setInStock(e.target.checked)} /> 
                            </li>
                            <li>
                                <label htmlFor="isnew">
                                    New product?
                                </label>
                                <input type="checkbox" name="isnew" checked={isnew || false} id="isnew" onChange={ e => setIsnew(e.target.checked)} /> 
                            </li>
                            <li>
                                <label htmlFor="discount">
                                    Discount?
                                </label>
                                <input type="Number" name="discount" value={discount || ''} id="discount" onChange={ e => setDiscount(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="delivery">
                                    Delivery
                                </label>
                                <select name="delivery" value={delivery} id="delivery" placeholder="xxxx" onChange={ e => setDelivery(e.target.value)} >
                                    <option value="">Options</option>
                                    <option value="1 to 3 days">1 to 3 days</option>
                                    <option value="3 to 5 days">3 to 5 days</option>
                                    <option value="5 to 7 days">5 to 7 days</option>
                                    <option value="more than 7 days">more than 7 days</option>
                                </select>
                            </li>
                            <label>
                                    Size Color Amount
                                </label>
                            <li id='sca'>
                                
                                {   
                                    sca &&
                                   
                                        
                                        sca.map( (item, index) => <div className="sca_div" key={index}>
                                                                        <span> Size : {item.size}, Color : {item.color}, Amount : {item.amount}</span>
                                                                        <button id="delete_button" type="button" onClick={() => setSca(sca.filter( item => sca.indexOf(item) !== index))}>Del</button>
                                                                </div> )        
                                        
                                   
                                }
                                
                                <select name="size" value={size} onChange={ e => setSize(e.target.value) } >
                                    <option >Size</option>
                                    {
                                        sizeOptions.map( (item, index) => <option key={index}>{item}</option>)
                                    }
                                </select>

                                <select name="color" value={color} onChange={ e => setColor(e.target.value) } >
                                    <option >Color</option>
                                    {
                                        colorOptions.map( (item, index) => <option key={index}>{item}</option>)
                                    }
                                </select>
                                <input type='Number' value={amount} placeholder="Amount" onChange={ e => setAmount(e.target.value)} onFocus={ (e) => e.target.value = '' }/>

                                <button type="button" onClick={() =>  {
                                                            const scaValue = {size, color, amount}
                                                            if (sca === undefined) {
                                                                setSca([scaValue ])
                                                            } else {
                                                                setSca([...sca, scaValue ])
                                                            }
                                                            setSize('')
                                                            setColor('')
                                                            setAmount(0)
                                                        }
                                                }
                                >Add SizeColorAmount</button>
                               
                            </li>
                            <li>
                                <label htmlFor="description">
                                    Description
                                </label>
                                <textarea name="description" value={description || ''} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                            </li>
                            <li>
                                <label htmlFor="files">
                                    Image
                                </label>
                                <input type="file" name="files" id="files" onChange={ e => setFiles(e.target.files)} multiple/>
                            </li>
                            <li>
                                <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
                            </li>
                            <li>
                                <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
                            </li>
                        </ul>
                    </form>
                </div> 
            )
        }
        <div>
            <div>
                Which Shop's products would you like to see ?
            </div>
            <div>
                <select name="preShop" value={preShop} id="preShop" onChange={ e => setPreShop(e.target.value) } >
                    <option>Select Shop</option>
                    <option>All</option>
                    {
                        userInfo.role === 'admin' ? shops.map( (item, index) => <option key={index}> {item.name+','+item._id}</option>) :  shopsOfOwner.map( (item, index) => <option key={index}> {item.name+','+item._id}</option>)
                    }
                </select>
            </div>
        </div>
        {
        preShop &&
        <div className="shop-list">
            <table className="table table-bordered table-responsive">
                <thead className="thead-light" >
                    <tr>
                        <th></th>
                        {/*<th>ID</th>*/}
                        <th>Shop</th>
                        <th>Name&Brand</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>In Stock</th>
                        <th>Is New</th>
                        <th>Discount</th>
                        <th>Delivery</th>
                        <th>SCA</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userInfo.role === 'admin' && preShop === 'All' ? 
                            products
                                .map( (product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}.</td>
                                        {/*<td>{product._id}</td>*/}
                                        <td>{shops.find(item => item._id === product.shop).name }</td>
                                        <td>{product.name} <br/> {product.brand}</td>
                                        <td>$ {product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.inStock ? 'Yes' : 'No'}</td>
                                        <td>{product.isnew ? 'Yes' : 'No'}</td>
                                        <td>{product.discount} %</td>
                                        <td>{product.delivery}</td>
                                        <td>{product.sca.map((item, i) => <div key={i}>{item.size}, {item.color}, {item.amount}</div> )}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            {
                                                product.image.map(item => <img src={"/productsImages/" + item } alt="productImages" width="100px" height="100px" />)

                                            }
                                        </td>
                                        <td>
                                            <button className="button" onClick={() =>  {openModal(product)
                                                                                        window.scrollTo(0, 0);
                                                                                    }}  
                                            >Edit</button>
                                            {' '}
                                            <button className="button" onClick={() => deleteHandler(product)} >Delete</button>
                                        </td>
                                    </tr>)) : null
                    }
                    
                    {
                        preShop === 'All' ? products
                            .filter( item => {
                                const shopsIds = shopsOfOwner.map( item => item._id)
                                if ( shopsIds.includes(item.shop)) {
                                    return item
                                }
                            })
                            .map( (product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}.</td>
                                    {/*<td>{product._id}</td>*/}
                                    <td>{shops.find(item => item._id === product.shop).name}</td>
                                    <td>{product.name} <br/> {product.brand}</td>
                                    <td>$ {product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.inStock ? 'Yes' : 'No'}</td>
                                    <td>{product.isnew ? 'Yes' : 'No'}</td>
                                    <td>{product.discount} %</td>
                                    <td>{product.delivery}</td>
                                    <td>{product.sca.map((item, i) => <div key={i}>{item.size}, {item.color}, {item.amount}</div> )}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        {
                                            product.image.map(item => <img src={"/productsImages/" + item } alt="productImages" width="100px" height="100px" />)

                                        }
                                    </td>
                                    <td>
                                        <button className="button" onClick={() => {
                                                                                        openModal(product)
                                                                                        window.scrollTo(0, 0);
                                                                                    }}  
                                        >Edit</button>
                                        {' '}
                                        <button className="button" onClick={() => deleteHandler(product)} >Delete</button>
                                    </td>
                                </tr>)) : null
                    }
                    {
                        preShop !== 'All' ? products.filter( item => item.shop === preShop.split(',')[1]).map( (product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}.</td>
                                {/*<td>{product._id}</td>*/}
                                <td>{shops.find(item => item._id === product.shop).name}</td>
                                <td>{product.name} <br/>{product.brand} </td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.inStock ? 'Yes' : 'No'}</td>
                                <td>{product.isnew ? 'Yes' : 'No'}</td>
                                <td>{product.discount} %</td>
                                <td>{product.delivery}</td>
                                <td>{product.sca.map((item, i) => <div key={i}>{item.size}, {item.color}, {item.amount}</div> )}</td>
                                <td>{product.description}</td>
                                <td>
                                        {
                                            product.image.map((item, index) => <img key={index} src={"/productsImages/" + item } alt="productImages" width="100px" height="100px" />)

                                        }
                                </td>
                                <td>
                                    <button className="button" onClick={() => {
                                                                                openModal(product)
                                                                                window.scrollTo(0, 0);
                                                                            }} 
                                    >Edit</button>
                                    {' '}
                                    <button className="button" onClick={() => deleteHandler(product)} >Delete</button>
                                </td>
                            </tr>)) : null
                    }
                </tbody>
            </table>
        </div>
        }
    </div>
  )
}

export default ProductManageOwner;