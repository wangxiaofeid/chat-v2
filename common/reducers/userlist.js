import { SET_USERS, DELETE_USER, ADD_USER } from '../actions'

export default function userlist(state = [], action) {
  console.log(action);
  switch (action.type) {
    case SET_USERS:
      return action.userlist
    case DELETE_USER:
        return state.filter((s) => s.id != action.id)
    case ADD_USER:
    	return [
    		action.user,
        	...state
        ]
    default:
      return state
  }
}
