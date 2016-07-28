import React from 'react'
import { Route } from 'react-router'
import App from '../containers/App'
import UserList from '../containers/UsersList'
import Message from '../containers/Message'
import Gangs from '../containers/Gangs'

export default (
  <Route path="/" component={App}>
    <Route path="/userlist" component={UserList} />
    <Route path="/Message" component={Message} />
    <Route path="/gangs" component={Gangs} />
  </Route>
)
