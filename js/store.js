import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers/index'

//creating a sudo history for a single page application with redux
export const history = createHistory()

//thunk handles asynchronous action creators
const initialState = {}
const middleware = [
  thunk,
  routerMiddleware(history)
]

//compose allows us to add multiple store enhancers in a row.
//in this case thunk and routerMiddleware for react router.
const composedEnhancers = compose(
  applyMiddleware(...middleware)
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
