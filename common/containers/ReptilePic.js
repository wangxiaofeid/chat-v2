import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'

import { InputNumber} from 'antd'

import ImageList from '../components/ImageList'
import InputMessage from '../components/InputMessage'


class ReptilePic extends Component{
	constructor(props) {
	    super(props)
	    this.state = {
	      	imgList: [],
			link: "",
			value: 30
	    }
		this.setLink = this.setLink.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange (value){
		this.setState({ value });
	}

	setLink(link){
		if(this.isLink(link)) {
			this.setState({
				imgList: [],
				link
			})
			this.getData(link);
		}
	}

	isLink(link){
		const regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/i;
		return regex.test(link)
	}

	getData(link){
		var that = this

		fetch(`/reptileApi?file=${link}&num=${this.state.value}`)
			.then(response => response.json())
			.then(json => {
				if(json.type){
					that.setState({
						imgList: json.data
					});
				}
			})
	}

	render(){
		
		return(
			<div>
				<div style={{marginBottom:'20px'}}>
					<InputNumber min={1} max={10000} defaultValue={30} onChange={this.handleInputChange}/>
					<div style={{display:'inline-block',marginLeft:'10px'}}>
						<InputMessage onSubmitMsg={this.setLink} save={true}/>
					</div>
				</div>
				<ImageList imgList={this.state.imgList}/>
			</div>
		)
	}
}

export default ReptilePic

