import { SET_FEED, SET_DONATION, MAKERS_PRICE, MAKERS_REMOVE, MAKERS_INVEST, MAKERS_RETURN } from "./actionTypes";

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
    case MAKERS_REMOVE:
      return {
        ...state,
        makersRemove: action.payload.makersRemove
      };
    case MAKERS_INVEST:
      return {
        ...state,
        makersInvest: action.payload.makersInvest
      };
    case MAKERS_RETURN:
      return {
        ...state,
        makersReturn: action.payload.makersReturn
      };

    default:
      return state;
  }
};

export default makersReducer;
