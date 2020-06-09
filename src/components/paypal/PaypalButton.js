import React, { useEffect } from 'react';
import { PayPalButton } from "react-paypal-button-v2";

function PaypalButton (props) {

    const { amount, onSuccess } = props;

    useEffect( () => {

        return () => {
            
        }
    }, [])
    
    return (
        <PayPalButton
            amount={amount}
            currency={'USD'}
            onSuccess={(details, data) => {
                    onSuccess(details, data)
                    alert("Payment completed by " + details.payer.name.given_name);
                }
            }
            options={{
                clientId: "Ae85otC4vmOb-1Z34I_sEX1DcpNxgS0d2CEei_wherwlW9BCW2yKwk6XYKB1iMFCqg2kjjTAEQDxSNYI"
            }}
        />
    )
}
export default PaypalButton;