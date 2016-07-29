import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserList, fetchDeleteUser, fetchAddUser } from '../actions'
import ImageList from '../components/ImageList'

class ReptilePic extends Component{
	constructor(props) {
	    super(props)
	    this.state = {
	      	imgList: []
	    }
	    this.menuHandleClick = this.menuHandleClick.bind(this);
	}

	render(){
		
		return(
			<div>
				<ImageList imgList={this.state.imgList}/>
			</div>
		)
	}
}

export default ReptilePic

