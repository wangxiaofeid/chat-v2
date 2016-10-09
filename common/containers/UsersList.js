import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import $ from 'jquery'
import { getUserList, fetchDeleteUser, fetchAddUser } from '../actions'
import UserTable from '../components/UserList'
import AppendUser from '../components/AppendUser'

class UserList extends Component{
	componentWillMount(){
		const {getUserList} = this.props;
		getUserList();
	}

	saveUser(name){
		$.ajax({
			type: 'POST',
		  	url: '/user/save',
		  	data: {
		  		username: name
		  	},
		  	success: function(data){
		  		console.log(data);
		  	}	
		});
	}

	render(){
		const {userlist, fetchDeleteUser, fetchAddUser} = this.props;
		return(
			<div>
				get:<AppendUser onSubmitFun = {fetchAddUser}/>
				&nbsp;&nbsp;&nbsp;&nbsp;
				post:<AppendUser onSubmitFun = {this.saveUser}/>
				<UserTable userlist={userlist} onDelete={fetchDeleteUser}>
				</UserTable>
			</div>
		)
	}
}


function mapStateToProps(state) {
  return {
    userlist: state.userlist||[]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getUserList,fetchDeleteUser,fetchAddUser}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserList)
