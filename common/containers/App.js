import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import antd from 'react-redux'
import Nav from '../components/Nav'
import Chat from '../containers/Chat'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      	<div>
          <Nav />
          <div style={{ padding: 20 }}>
            {this.props.children || <Chat />}
          </div>
      	</div>
    )
  }
}

export default connect()(App)
