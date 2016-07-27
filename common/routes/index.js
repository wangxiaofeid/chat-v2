import React from 'react'
import { Route } from 'react-router'
import App from '../containers/App'
import UserList from '../containers/UsersList'
import Message from '../containers/Message'
// import UserPage from './containers/UserPage'
// import RepoPage from './containers/RepoPage'

export default (
  <Route path="/" component={App}>
    <Route path="/userlist" component={UserList} />
    <Route path="/message" component={Message} />
  </Route>
)
