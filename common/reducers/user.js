import { LOGIN_USER, SET_SOCKET } from '../actions'

export default function counter(state = { name: "游客", color: "red", id: "", "socket":false }, action) {
  switch (action.type) {
    case LOGIN_USER:
      	return  Object.assign({}, state, action.user)
    case SET_SOCKET:
    	return  Object.assign({}, state, {socket: action.socket})
    default:
      	return state
  }
}
