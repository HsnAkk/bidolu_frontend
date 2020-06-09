import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../../actions/cartActions';
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps';
import './ShippingPage.css';


function ShippingPage(props) {

    let history = useHistory();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country }));
        history.push('/payment');
    }

    return (
        <div className="shipping-box">
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <div className="form-box">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h4 style={{textAlign: 'center'}}>Shipping</h4>
                        </li>
                        <li>
                            <label htmlFor="address">
                                Address
                            </label>
                            <input type="text" name="address" id="address" onChange={ e => setAddress(e.target.value)} required>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="city">
                                City
                            </label>
                            <input type="text" name="city" id="city" onChange={ e => setCity(e.target.value)} required>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="postalCode">
                                Postal Code
                            </label>
                            <input type="text" name="postalCode" id="postalCode" onChange={ e => setPostalCode(e.target.value)} required>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="country">
                                Country
                            </label>
                            <input type="text" name="country" id="country" onChange={ e => setCountry(e.target.value)} required>
                            </input>
                        </li>
                        <li>
                            <button type="submit" className="button-shipping">Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}
export default ShippingPage; 