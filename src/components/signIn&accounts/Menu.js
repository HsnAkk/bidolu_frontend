import React from 'react';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../actions/errorActions';
import { useDispatch } from 'react-redux';
import '../header/header.css';



 const Menu = () => {

    const lists = [
                    ['/', 'Create a List'],
                    ['/', 'Find a Gift'],
                    ['/', 'Wedding Registery'],
                    ['/', 'Baby Registery'],
                    ['/', 'Your Hearts']
                  ]
    const account = [
                        ['/profile', 'Your Account'],
                        ['/myorders', 'Your Orders'],
                        ['/your_lists', 'Your List']
                    ]

    const dispatch = useDispatch();

    const clearError = () => {
        //console.log('clearError activated')
        dispatch(clearErrors());
    } 

    return (
        <div className="menu">   
            <div className="row p-2 menu-top">
                <Link to="/signin"><button className="menu-top-button" onClick={clearError}>Sign In</button></Link>
                <p>New customer? <Link to="/register" onClick={clearError}> Start here.</Link></p>
            </div> 
            <hr/>
            <div className="row p-2 menu-bottom">
                <div className="col-6 border-right">
                    <p>Your Lists</p>
                    <ul>
                        {
                            lists.map( (item, index) => <li key={index}><Link to={item[0]}>{item[1]}</Link></li>)
                        }
                    </ul>
                </div>
                <div className="col-6">
                    <p>Your Account</p>
                    <ul>
                        {
                            account.map( (item, index) => <li key={index}><Link to={item[0]}>{item[1]}</Link></li>)
                        }
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default Menu;
