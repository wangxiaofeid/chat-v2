import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import counter from './counter'
import userlist from './userlist'
import user from './user'

const rootReducer = combineReducers({
  counter,
  userlist,
  user,
  routing
})

export default rootReducer
