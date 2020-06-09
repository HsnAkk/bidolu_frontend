
import React, { useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { facebookSignin } from '../../actions/userActions';



function SigninFacebookPage(props) {

    let history = useHistory()

    const userFacebookSignin = useSelector(state => state.userFacebookSignin);
    const { userFacebookInfo } = userFacebookSignin;

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(facebookSignin(props.match.params.id));
        if (userFacebookInfo) {
            history.push("/");
        }      
    }, [userFacebookInfo]);

    console.log('facebookInfo :' , userFacebookInfo)

    return (
        <div>
            
        </div>
    )
}

export default SigninFacebookPage
