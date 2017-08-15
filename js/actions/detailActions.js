import { SHOW_DETAILS, CLEAR_DETAILS } from '../actions/types';
//handles whether to show details for a show or clearing a selected show

export const showDetails = (event) => {
  return {
    type: SHOW_DETAILS,
    payload: event
  }
}

export const hideDetails = () => {
  return {
    type: CLEAR_DETAILS,
    payload: ''
  }
}
