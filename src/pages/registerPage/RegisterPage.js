
import React, { useEffect, useState } from 'react';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FiKey } from 'react-icons/fi';
import { Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';
import './registerPage.css'



function RegisterPage(props) {

    const [ alertShow, setAlertShow ] = useState(false)
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo } = userRegister;

    const errorState = useSelector(state => state.error);
    const { msg } = errorState;
    
    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [userInfo]);


    const submitHandler = e => {
        e.preventDefault();
        if (password === rePassword) {
            dispatch(register(name, email, password));
        } else {
           setAlertShow(true)
        }
    }

    const clearError = () => {
        dispatch(clearErrors());
    } 
    const errorMessage = msg.msg;
    
    return (
        <Modal show={show} onHide={handleClose} className="modal-signup">
            <Modal.Body>
                { loading && <div>Loading...</div> }
                { msg.msg  && <Alert variant="danger">{errorMessage}</Alert> }
                { alertShow  && <Alert variant="danger">Password and rePassword are not the same...!</Alert> }

                <div className="m-2">
                    <h3 className="text-center p-3">Create Account </h3>
                    <form onSubmit={submitHandler}>
                        <div className="form-group signup">
                            <input type="text" name="name" onChange={ e => setName(e.target.value)} placeholder="Your name" />
                            <AiOutlineUser className="fa-icon"/>
                        </div>
                        <div className="form-group signup">
                            <input type="email" name="email" onChange={ e => setEmail(e.target.value)} placeholder="Email" />
                            <AiOutlineMail className="fa-icon"/>
                        </div>
                        <div className="form-group signup">
                            <input type="password" name="password" onChange={ e => setPassword(e.target.value)} placeholder="Password" />
                            <FiKey className="fa-icon"/>
                        </div>
                        <div className="form-group signup">
                            <input type="password" name="rePassword" onChange={ e => setRePassword(e.target.value)} placeholder="Re-enter password" />
                            <FiKey className="fa-icon"/>
                        </div>
                        <button type="submit" className="btn-signup">Create your BiDolu account</button>
                    </form>
                    <div className="signup-signin">
                        <p> Have already an account?
                        <Link to={redirect === "/" ? "/signin" : `/${redirect}`} onClick={clearError} ><span>Sign in</span></Link>
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RegisterPage;






