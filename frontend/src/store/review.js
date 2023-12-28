import { csrfFetch } from './csrf';

const SET_REVIEW = "session/review";

const setReview = (review) =>{
    return {
      type: SET_REVIEW,
      payload: review
    }
  }


  export const review = (review) => async (dispatch) => {
    const {reviewText, stars, spotId} = review;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({
        review: reviewText,
        stars
      })
    })
    const data = await response.json();
    if (response.ok) {
      dispatch(setReview(data));
    }else{
      console.log(data.message)
    }
    return response;
  };

  const initialState = {
    review: {}, 
  };
  
  const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_REVIEW:
        return {
          ...state,
          review: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reviewReducer;
