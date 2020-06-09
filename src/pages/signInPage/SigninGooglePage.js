
import React, { useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { googleSignin } from '../../actions/userActions';



function SigninGooglePage(props) {

    let history = useHistory()

    const userGoogleSignin = useSelector(state => state.userGoogleSignin);
    const { userGoogleInfo } = userGoogleSignin;

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(googleSignin(props.match.params.id));
        if (userGoogleInfo) {
            history.push("/");
        }      
    }, [userGoogleInfo]);


    return (
        <div>
            
        </div>
    )
}

export default SigninGooglePage
