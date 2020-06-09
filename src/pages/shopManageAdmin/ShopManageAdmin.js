import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveShop, listShop, deleteShop } from '../../actions/shopActions';
import FormData from "form-data";
import './ShopManageAdmin.css';
import { Spinner } from 'react-bootstrap';


function ShopManageAdmin(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [owner, setOwner] = useState(userInfo.name);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState({});
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');

    const shopList = useSelector(state => state.shopList);
    const { loading, shops, error } = shopList;

    const shopSave = useSelector(state => state.shopSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = shopSave;

    const shopDelete = useSelector(state => state.shopDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = shopDelete;


    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listShop());

  }, [successSave, successDelete]);

  const openModal = shop => {
    setModalVisible(true);
    setId(shop._id);
    setOwner(shop.owner);
    setName(shop.name);
    setDescription(shop.description);
    setCategory(shop.category);
    setRating(shop.rating);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", name);
    formData.append("owner", owner);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("rating", rating);
    
    if (!id) {
        dispatch(saveShop(formData))
        setFile(null)
    } else {
        dispatch(saveShop({_id: id, formData}))
        setFile(null)
    }
  }

  const deleteHandler = (shop) => {
    dispatch(deleteShop(shop._id));
  }

  return (
  
    <div className="content-margined">
        <div className="shop-header">
            <h4>Shops</h4>
            <button className="button primary" onClick={() => openModal({})}>Create Shop</button>
        </div>
        {
            modalVisible && (
                <div className="form">
                    <form onSubmit={submitHandler} encType="multipart/form-data">
                        <ul className="form-container">
                            <li>
                                <h4>Create Shop</h4>
                            </li>
                            <li>
                                {loadingSave && <Spinner animation="border" variant="danger" />}
                                {errorSave && <div>{errorSave}</div>}
                            </li>
                            {
                                id ? 
                                    <li>
                                        <label htmlFor="owner">
                                            Owner
                                        </label>
                                        <input type="text" name="owner" value={owner} id="owner" onChange={ e => setOwner(e.target.value)} />
                                    </li>
                                    :
                                    null
                            }
                            <li>
                                <label htmlFor="name">
                                    Name
                                </label>
                                <input type="text" name="name" value={name || '' } id="name" onChange={ e => setName(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="name">
                                    Category
                                </label>
                                <input type="text" name="category" value={category || ''} id="category" onChange={ e => setCategory(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="rating">
                                    Rating
                                </label>
                                <input type="number" name="rating" value={rating || ''} id="rating" onChange={ e => setRating(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="description">
                                    Description
                                </label>
                                <textarea name="description" value={description || ''} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                            </li>
                            <li>
                                <label htmlFor="file">
                                    Image
                                </label>
                                <input type="file" name="file" id="file" onChange={ e => setFile(e.target.files[0])} />
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
        <div className="shop-list">
            <table className="table table-bordered">
                <thead className="thead-light" >
                    <tr>
                        <th></th>
                        {/*<th>ID</th>*/}
                        {/*<th>Owner</th>*/}
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Image</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userInfo.role === 'admin' ? 
                            
                            shops.map( (shop, index) => (
                                <tr key={shop._id}>
                                    <td>{index + 1}.</td>
                                    {/*<td>{shop._id}</td>*/}
                                    {/*<td>{shop.owner}</td>*/}
                                    <td>{shop.name}</td>
                                    <td>{shop.category}</td>
                                    <td>{shop.description}</td>
                                    <td>{shop.rating}</td>
                                    <td><img src={"/shopsImages/" + shop.image} alt="shopImage" width="100px" height="100px" /></td>
                                    <td>
                                        <button className="button" onClick={() => openModal(shop)} >Edit</button>
                                        {' '}
                                        <button className="button" onClick={() => deleteHandler(shop)} >Delete</button>
                                    </td>
                                </tr>)) 
                            :

                            shops.filter(item => item.owner === userInfo._id).map( (shop, index) => (
                                <tr key={shop._id}>
                                    <td>{index + 1}.</td>
                                    {/*<td>{shop._id}</td>*/}
                                    {/*<td>{shop.owner}</td>*/}
                                    <td>{shop.name}</td>
                                    <td>{shop.category}</td>
                                    <td>{shop.description}</td>
                                    <td>{shop.rating}</td>
                                    <td><img src={"/shopsImages/" + shop.image} alt="shopImage" width="90px" height="90px" /></td>
                                    <td>
                                        <button className="button" onClick={() => openModal(shop)} >Edit</button>
                                        {' '}
                                        <button className="button" onClick={() => deleteHandler(shop)} >Delete</button>
                                    </td>
                                </tr>))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ShopManageAdmin;