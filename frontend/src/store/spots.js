const ADD_SPOT = 'spots/ADD_SPOT';

export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot,
  }
}

const initialState = {
  Spots: [],
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPOT:
      return {
        ...state,
        spots: [...state.Spots, action.payload],
      };
    default:
      return state;
  }
};

export default spotsReducer;
