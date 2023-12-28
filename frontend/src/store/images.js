import { csrfFetch } from './csrf';

const ADD_IMAGES = 'session/images'

const addImages = (images)  =>{
    return {
      type: ADD_IMAGES,
      payload: images
    }
  }

export const createImages = (images, spotId)=> async (dispatch) => {
    for(let image of images){
      if(image !== ''){
      const response = await csrfFetch(`/api/spots/${spotId}/images`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',},
        body: JSON.stringify({url: image, preview: true})
      })
      const data = await response.json(
      )
      if(!response.ok){
        return data.message
      }
    dispatch(addImages([data.image]))
    }}
  }

  const initialState = {
    images: [],
  };
  
  const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_IMAGES:
        return {
          ...state,
          images: [...state.images, ...action.payload],
        };
      default:
        return state;
    }
  };
  
  export default imagesReducer;
