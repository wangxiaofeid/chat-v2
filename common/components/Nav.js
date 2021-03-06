import React, { Component, PropTypes } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router'

class Nav extends Component {
	constructor(props) {
	    super(props)
	    this.state = {
	    	current: 'home'
	    }
	    this.handleClick = this.handleClick.bind(this);
	  }

	handleClick(e){
		this.setState({
	      current: e.key,
	    });
	}

  render() {
    return (
      <Menu onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="userlist">
          <Link to="/userlist">用户列表</Link>
        </Menu.Item>
        <Menu.Item key="message">
          <Link to="/message">消息列表</Link>
        </Menu.Item>
        <Menu.Item key="forceByD3">
          <Link to="/forceByD3">力导图</Link>
        </Menu.Item>
        <Menu.Item key="forceByD3Svg">
          <Link to="/forceByD3Svg">力导图svg</Link>
        </Menu.Item>
        <Menu.Item key="forceByD3Svg2">
          <Link to="/forceByD3Svg2">力导图svg2</Link>
        </Menu.Item>
        <Menu.Item key="forceByD3Canvas">
          <Link to="/forceByD3Canvas">力导图canvas</Link>
        </Menu.Item>
        <Menu.Item key="forceByD3CanvasV4">
          <Link to="/forceByD3CanvasV4">d3 v4 canvas</Link>
        </Menu.Item>
        <Menu.Item key="reptile">
          <Link to="/reptile">抓图</Link>
        </Menu.Item>
        <Menu.Item key="fileUpload">
          <Link to="/fileUpload">传图</Link>
        </Menu.Item>
        <Menu.Item key="fileUpload2">
          <Link to="/fileUpload2">传图2</Link>
        </Menu.Item>
        <Menu.Item key="fileUpload3">
          <Link to="/fileUpload3">传图3</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

Nav.propTypes = {
  // user: PropTypes.object.isRequired
}

export default Nav
