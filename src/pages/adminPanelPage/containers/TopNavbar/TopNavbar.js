import React from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../../actions/userActions';
import './TopNavBar.css';


function TopNavbar() {

    let history = useHistory();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    //console.log(userSignin)

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        history.push('/')
    }

    return (
        
       <div className="container-box">
           <div>
                <div>
                    <img src="/images/user.png" className="rounded-circle" width="30px" height="30px" alt="user" />
                </div>
                <div>{userInfo.name}</div>
                <div onClick={handleLogout}><i className="fas fa-sign-out-alt"></i></div>
           </div>
       </div>
    )
}

export default TopNavbar
