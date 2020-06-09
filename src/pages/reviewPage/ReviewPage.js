import React, { useEffect, useState } from 'react';
import { MdPersonPinCircle, MdEmail, MdSubject } from 'react-icons/md';
import { Modal, Alert } from 'react-bootstrap';
import ReactStars from 'react-stars'
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../../actions/productActions';
import './ReviewPage.css'



function ReviewPage(props) {

    const [show, setShow] = useState(true);
    const [reviewId, setReviewId] = useState('');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [productId, setProductId] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [review, setReview] = useState({});

   

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo } = userSignin;

    const userGoogleSignin = useSelector(state => state.userGoogleSignin);
    const { userGoogleInfo } = userGoogleSignin;

    const userFacebookSignin = useSelector(state => state.userFacebookSignin);
    const { userFacebookInfo } = userFacebookSignin;

    const errorState = useSelector(state => state.error);
    const { msg } = errorState;
    
    const dispatch = useDispatch();


    useEffect(() => {
        if (userInfo || userGoogleInfo || userFacebookInfo) {
            console.log(userInfo || userGoogleInfo || userFacebookInfo)
            userInfo ? setUserId(userInfo._id) : userGoogleInfo ? setUserId(userGoogleInfo._id) : setUserId(userFacebookInfo._id)
            userInfo ? setName(userInfo.name) : userGoogleInfo ? setName(userGoogleInfo.name) : setName(userFacebookInfo.name)
            userInfo ? setEmail(userInfo.email) : userGoogleInfo ? setEmail(userGoogleInfo.email) : setEmail(userFacebookInfo.email)
        }
        setProductId(props.location.state.productId)
        setPrevUrl(props.location.state.url_link)
        setReview(props.location.state.review)
        
        if (props.location.state.review !== {}) {
            const rev = props.location.state.review;
            setReviewId(rev._id)
            setTitle(rev.title)
            setRating(rev.rating)
            setComment(rev.comment)
        }
        
    }, []);

    const handleClose = () => {
                                setShow(false);
                                window.history.back();
    }

    const submitHandler = e => {
        e.preventDefault();

        if (review._id) {
            dispatch(addReview(productId, {
                _id : reviewId,
                user : userId,
                product: productId,
                name,
                email,
                title,
                rating,
                comment
            }));

        } else {
            dispatch(addReview(productId, {
                user : userId,
                product: productId,
                name,
                email,
                title,
                rating,
                comment
            }));
        }
        setShow(false);
        window.history.back();
    }

    const clearError = () => {
        //dispatch(clearErrors());
    } 
    const ratingChanged = (newRating) => {
        //console.log(newRating)
        setRating(newRating)
      }
    const errorMessage = msg.msg;

    return (
        <Modal show={show} onHide={handleClose} className="modal-review">
            <Modal.Body>
                { loading && <div>Loading...</div> }
                { msg.msg  && <Alert variant="danger">{errorMessage}</Alert> }
                <div className="m-2">
                    <h3 className="text-center p-3">{ !review._id ? 'Write a Review' : 'Update Review'}</h3>
                    <form onSubmit={submitHandler}>
                        <div className="form-group review">
                            <input type="text" name="name" onChange={ e => setName(e.target.value)} value= {name || ''} placeholder="Enter your Name" />
                            <MdPersonPinCircle className="fa-icon"/>
                        </div>
                        <div className="form-group review">
                            <input type="email" name="email" onChange={ e => setEmail(e.target.value)} value= {email || ''} placeholder="Enter your Email" />
                            <MdEmail className="fa-icon"/>
                        </div>
                        <div className="form-group">
                            <p style={{color: 'grey', fontSize: '14px'}}> Rate this item</p>
                            <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={18}
                                        color2={'#ffd700'} 
                                        value= {rating}
                            />
                        </div>
                        <div className="form-group review">
                            <input type="text" name="title" onChange={ e => setTitle(e.target.value)} value= {title || ''} placeholder="Enter your review a title" />
                            <MdSubject className="fa-icon"/>
                        </div>
                        <div className="form-group review-text">
                            <textarea name="review" onChange={ e => setComment(e.target.value)} value= {comment || ''} placeholder="Write your comments here" />
                        </div>
                        <button type="submit" className="btn-signIn">{ !review._id ? 'Submit Review' : 'Update Review'}</button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ReviewPage
