import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listUsers, deleteUser, updateUser } from '../../../../actions/userActions';
import './UsersListPage.css';


function UsersListPage () {

    let tempUsers;
    let history = useHistory();

    const [ roleFilter, setRoleFilter ] = useState([])
    const [ userlist, setUserlist ] = useState([])
    const [ userState, setUserState ] = useState({})

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [role, setRole] = useState('');


    const userList = useSelector(state => state.userList);
    const { loading, users, error } = userList;

    const userUpdate = useSelector(state => state.userUpdate);
    const { success: successUpdate } = userUpdate;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    const dispatch = useDispatch();

    tempUsers = users;

    useEffect(() => {
        dispatch(listUsers());

        if (roleFilter.length === 0) {
            setUserlist(users)
        } else if (roleFilter.length > 0 ) {
            tempUsers = tempUsers.filter( item => roleFilter.includes(item.role));
            setUserlist(tempUsers)
        }
        if ( successDelete) {
            history.push('/admin/userlist')
        }
        if (successUpdate) {
            setModalVisible(false);
        }
    }, [roleFilter, successDelete, successUpdate]);
   
    // to update user role data
    const openModal = user => {
        setModalVisible(true);
        setId(user._id);
        setRole(user.role);
    }

    const submitHandler = e => {
        e.preventDefault();
        const user = {
            ...userState, 
            role
        }
        dispatch(updateUser(user)) 
        setUserState({})      
    }

    // to delete user
    const deleteHandler = (user) => {
        dispatch(deleteUser(user._id));
    }

    // to manage role filter part
    const roleHandler = e => {
        if (e.target.checked) {
            if (!roleFilter.includes(e.target.value)) {
                setRoleFilter([...roleFilter, e.target.value])
            }
        } else {
            if (roleFilter.includes(e.target.value)) {
                setRoleFilter(roleFilter.filter( item => item !== e.target.value ))
            }
        }
    }

    return (
        <div className="content-margined">
            <div className="shop-header">
                <div>
                    <h4>Users List</h4>
                </div>
                <div>
                    <ul>
                        <li>
                            <input type="checkbox" id="admin" value="admin" onChange={roleHandler} />
                            <label htmlFor="admin">Admin</label>
                        </li> 
                        <li>
                            <input type="checkbox" id="shopOwner" value="shopOwner" onChange={roleHandler} />
                            <label htmlFor="shopOwner">Shop Owner</label>
                        </li> 
                        <li>
                            <input type="checkbox" id="user" value="user" onChange={roleHandler} />
                            <label htmlFor="user">User</label>
                        </li> 
                        
                    </ul>
                </div>
            </div>
            {
                modalVisible && (
                    <div className="form-box">
                        <form onSubmit={submitHandler}>
                            <ul className="form-container">
                                <li>
                                    <h4>Update User Role</h4>
                                </li>
                                <li>
                                    <label htmlFor="userId">
                                        Id
                                    </label>
                                    <input type="text" name="userId" value={id || ''} id="userId" readOnly/>
                                </li>
                                <li>
                                    <label htmlFor="role">
                                        Role
                                    </label>
                                    <input type="text" name="role" value={role || '' } id="role" onChange={ e => setRole(e.target.value)} />
                                </li>
                                <li>
                                    <button type="submit" className="button primary">Update</button>
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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Method</th>
                            <th>Role</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   roleFilter.length === 0 & !userlist ?             
                            users.map( (user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}.</td>
                                    <td>{user._id}</td>
                                    <td>{user.local ? user.local.name : user.google ? user.google.name : user.facebook.name}</td>
                                    <td>{user.local ? user.local.email : user.google ? user.google.email : user.facebook.email}</td>
                                    <td>{user ? user.methods.map( (item, i) => <p key={i}>{item}</p>) : null}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="button" onClick={() => { 
                                                                                    openModal(user)
                                                                                    setUserState(user)
                                                                                    }
                                                                            }
                                        >Update Role</button>
                                        {' '}
                                        <button className="button" onClick={() => deleteHandler(user)}>Delete</button>
                                    </td>
                                </tr>)) 
                            : null
                        }
                        {   userlist &&              
                            userlist.map( (user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}.</td>
                                    <td>{user._id}</td>
                                    <td>{user.local ? user.local.name : user.google ? user.google.name : user.facebook.name}</td>
                                    <td>{user.local ? user.local.email : user.google ? user.google.email : user.facebook.email}</td>
                                    <td>{user ? user.methods.map( (item, i) => <p key={i}>{item}</p>) : null}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="button" onClick={() => { 
                                                                                    window.scrollTo(0,0)
                                                                                    openModal(user)
                                                                                    setUserState(user)
                                                                                    }
                                                                            }
                                        >Update Role</button>
                                        {' '}
                                        <button className="button" onClick={() => deleteHandler(user)} >Delete</button>
                                    </td>
                                </tr>)) 
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersListPage;