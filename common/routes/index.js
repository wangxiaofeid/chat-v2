import React from 'react'
import { Route } from 'react-router'
import App from '../containers/App'
import UserList from '../containers/UsersList'
import Message from '../containers/Message'
import ForceByD3 from '../containers/ForceByD3'
import ReptilePic from '../containers/ReptilePic'
import FileUpload from '../containers/FileUpload'
import FileUpload2 from '../containers/FileUpload2'

export default (
  <Route path="/" component={App}>
    <Route path="/userlist" component={UserList} />
    <Route path="/Message" component={Message} />
    <Route path="/forceByD3" component={ForceByD3} />
    <Route path="/reptile" component={ReptilePic} />
    <Route path="/fileUpload" component={FileUpload} />
    <Route path="/fileUpload2" component={FileUpload2} />
  </Route>
)
