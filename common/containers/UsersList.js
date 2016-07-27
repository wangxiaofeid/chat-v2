import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { QueueAnim } from 'antd'
import { getUserList, fetchDeleteUser, fetchAddUser } from '../actions'
import UserTable from '../components/UserList'
import AppendUser from '../components/AppendUser'

class UserList extends Component{
	componentWillMount(){
		const {getUserList} = this.props;
		getUserList();
	}

	render(){
		const {userlist, fetchDeleteUser, fetchAddUser} = this.props;
		return(
			<div>
				<AppendUser onSubmitFun = {fetchAddUser}/>
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
