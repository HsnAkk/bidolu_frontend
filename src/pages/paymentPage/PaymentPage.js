import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { savePayment } from '../../actions/cartActions';
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps';
import './PaymentPage.css';


function PaymentPage(props) {

    let history = useHistory();

    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        //console.log('payment metod :', paymentMethod)
        dispatch(savePayment({ paymentMethod }));
        history.push('/placeorder');
    }

    return (
        <div className="payment-box">
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <div className="form">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h4 style={{textAlign: 'center'}}>Payment</h4>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="paymentMethod" id="paymentMethodOne" value="Paypal"
                                    onChange={ e => setPaymentMethod(e.target.value)}>
                                </input>
                                <label htmlFor="paymentMethodOne">
                                    Paypal
                                </label>
                                <div>
                                <input type="radio" name="paymentMethod" id="paymentMethodTwo" value="Credit Card"
                                    onChange={ e => setPaymentMethod(e.target.value)}>
                                </input>
                                <label htmlFor="paymentMethodTwo">
                                    Credit Card
                                </label>
                            </div>
                            </div>
                        </li>
                        <li>
                            <button type="submit" className="button-payment">Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    ) 
}
export default PaymentPage; 