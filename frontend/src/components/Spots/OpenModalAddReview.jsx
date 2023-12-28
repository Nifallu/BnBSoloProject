import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import StarRatingInput from '../Reviews/starInput.jsx';
import * as sessionActions from '../../store/review';


const ReviewModal = ({spotId}) => {
    const [errors, setErrors] = useState({});
    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState('1')

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(
            sessionActions.review({
                reviewText,
                stars,
                spotId
            })
          )
            .then(closeModal)
            .catch(async (res) => {
              const data = await res.json();
              if (data?.errors) {
                setErrors(data.errors);
              }
            console.log(errors)  
            });
            
        }

        const onChange = (number) => {

          setStars(number);
        };


    return (
        <div className='ReviewModal'>
            <h2>How was your stay</h2>
            <input  className='reviewTextarea'
                    type='textarea' 
                    placeholder='Leave your review here...'
                    value={reviewText}
                    onChange={(e)=>setReviewText(e.target.value)}
                    required
                    >
            </input>
            <p>{reviewText.length <10 && 'must be longer than 10 characters'}</p>
            <StarRatingInput 
                    disabled={false}
                    onChange={onChange}
                    rating={stars}/>
            <button onClick={handleSubmit}
                    disabled={reviewText.length < 10}
                    >Submit Your Review</button>
        </div>
    )
};

export default ReviewModal;
