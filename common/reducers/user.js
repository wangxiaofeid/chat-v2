import { LOGIN_USER } from '../actions'

export default function counter(state = { name: "游客", color: "red", id: "" }, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.user
    default:
      return state
  }
}
