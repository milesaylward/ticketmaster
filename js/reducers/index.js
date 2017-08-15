import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import SearchReducer from './searchReducer';
import EventReducer from './eventReducer';

//routerReducer keeps the data in sync with the current route
export default combineReducers({
  routing: routerReducer,
  data: SearchReducer,
  event: EventReducer
})
