import React from 'react'
import { Route } from 'react-router'
import App from '../containers/App'
import UserList from '../containers/UsersList'
import Message from '../containers/Message'
import ForceByD3 from '../containers/ForceByD3'
import forceByD3Svg from '../containers/forceByD3Svg'
import forceByD3Svg2 from '../containers/forceByD3Svg2'
import forceByD3Canvas from '../containers/forceByD3Canvas'
import ReptilePic from '../containers/ReptilePic'
import FileUpload from '../containers/FileUpload'
import FileUpload2 from '../containers/FileUpload2'

export default (
  <Route path="/" component={App}>
    <Route path="/userlist" component={UserList} />
    <Route path="/Message" component={Message} />
    <Route path="/forceByD3" component={ForceByD3} />
    <Route path="/forceByD3Svg" component={forceByD3Svg} />
    <Route path="/forceByD3Svg2" component={forceByD3Svg2} />
    <Route path="/forceByD3Canvas" component={forceByD3Canvas} />
    <Route path="/reptile" component={ReptilePic} />
    <Route path="/fileUpload" component={FileUpload} />
    <Route path="/fileUpload2" component={FileUpload2} />
    <Route path="*" component={App} />
  </Route>
)
