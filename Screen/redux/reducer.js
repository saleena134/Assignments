import {CHATING} from './action';

const initialstate = {
  chating: [],
};

export const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case CHATING:
      return {...state, chating: action.payload};
    default:
      return state;
  }
};
