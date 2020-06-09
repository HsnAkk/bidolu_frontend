
import React, { useEffect, useState } from 'react';
import { FaGooglePlusSquare, FaFacebookSquare } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { TiKeyOutline } from 'react-icons/ti';
import { Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';
import './signinPage.css'



function SigninPage(props) {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo } = userSignin;

    const errorState = useSelector(state => state.error);
    const { msg } = errorState;
  
    
    const dispatch = useDispatch();


    useEffect(() => {
        if (userInfo) {
            props.history.push("/");
        }
        
    }, [userInfo]);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    const clearError = () => {
        dispatch(clearErrors());
    } 
    
    const errorMessage = msg.msg;

    return (
        <Modal show={show} onHide={handleClose} className="modal-signin">
            <Modal.Body>
                { loading && <div>Loading...</div> }
                { msg.msg  && <Alert variant="danger">{errorMessage}</Alert> }
                <div className="m-2">
                    <h3 className="text-center p-3">Login</h3>
                    <form onSubmit={submitHandler}>
                        <div className="form-group signin">
                            <input type="email" name="email" onChange={ e => setEmail(e.target.value)} placeholder="Email" />
                            <AiOutlineMail className="fa-icon"/>
                        </div>
                        <div className="form-group signin">
                            <input type="password" name="password" onChange={ e => setPassword(e.target.value)} placeholder="Password" />
                            <TiKeyOutline className="fa-icon"/>
                        </div>
                        <button type="submit" className="btn-signIn">Login</button>
                    </form>
                    <div className="signin-signup">
                        <p> Have not an account yet?
                            <Link to="/register" onClick={clearError}><span>Sign Up</span></Link>
                        </p>
                    </div>
                    <div className="extra-login">
                        <span>Or</span>
                        <div className="login-social">
                            <a href="https://bidolu-backend.herokuapp.com/users/google"><FaGooglePlusSquare className="btn-google" /></a>
                            <a href="https://bidolu-backend.herokuapp.com/users/facebook"><FaFacebookSquare className="btn-facebook"/></a>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SigninPage







