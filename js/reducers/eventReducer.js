import { SHOW_DETAILS, CLEAR_DETAILS, GET_DIRECTIONS } from '../actions/types';

const INITIAL_STATE = {
  selected: '',
  direction: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_DETAILS:
        return {
          selected: action.payload
        }
    case CLEAR_DETAILS:
      return {
        selected: ''
      }
    default:
      return state;
  }
}
