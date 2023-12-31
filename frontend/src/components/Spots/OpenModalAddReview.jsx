import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import StarRatingInput from '../Reviews/starInput.jsx';
import * as sessionActions from '../../store/review';


const ReviewModal = ({spotId, onReviewSubmit}) => {
    const [errors, setErrors] = useState({});
    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState('1')
    const [serverError, setServerError] = useState(null);

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(() => {
      setServerError(null);
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      console.log(errors)
  
      try {
        const response = await dispatch(
          sessionActions.review({
            reviewText,
            stars,
            spotId,
          })
        );
  
        if (!response.ok) {
          const data = await response.json();
          if (data?.errors) {
            setErrors(data.errors);
          } else {
            setServerError('Server error occurred. Please try again.');
          }
        } else {
          setReviewText('');
          setStars('1');
          closeModal();
          onReviewSubmit(); 
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        setServerError('An unexpected error occurred. Please try again.');
      }
    };

        const onChange = (number) => {
          setStars(number);
        };


    return (
        <div className='ReviewModal'>
            <h2>How was your stay</h2>
            {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
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
