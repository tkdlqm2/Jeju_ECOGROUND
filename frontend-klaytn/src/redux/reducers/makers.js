import { SET_FEED } from "../actions/actionTypes";

const initialState = {
  feed: null
};

const makersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEED:
      return {
        ...state,
        feed: action.payload.feed
      };

    case SET_DONATION:
      return {
        ...state,
        dontaion: action.payload.dontaion
      };
    case MAKERS_PRICE:
      return {
        ...state,
        makersPrice: action.payload.makersPrice
      };

    default:
      return state;
  }
};

export default makersReducer;
