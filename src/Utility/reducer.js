import { useReducer } from 'react';
import { Type } from './action.type';

const initialState = {
  cart: []
}

function reducer(state, action) {
  switch (action.type) {
    case Type.ADD_TO_CART:
      return {
        ...state,
        cart: [
          ...state.cart,
          action.item
        ]
      }
    default:
      return state;
  }
}

export { initialState, reducer };
