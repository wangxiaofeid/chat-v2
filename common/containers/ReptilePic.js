import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserList, fetchDeleteUser, fetchAddUser } from '../actions'
import UserTable from '../components/UserList'

class ReptilePic extends Component{
	constructor(props) {
	    super(props)
	    this.state = {
	      current: '1',
	    }
	    this.menuHandleClick = this.menuHandleClick.bind(this);
	}

	render(){
		
		return(
			<div>
				
			</div>
		)
	}
}

export default ReptilePic

