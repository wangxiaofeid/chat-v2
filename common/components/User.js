import React, { Component, PropTypes } from 'react'

class User extends Component {
  render() {
    const { userlist } = this.props;
    const columns = [{
		  title: '姓名',
		  dataIndex: 'name',
		  key: 'name',
		  render: (text) => <a href="#">{text}</a>,
		}, {
		  title: '年龄',
		  dataIndex: 'age',
		  key: 'age',
		}, {
		  title: '住址',
		  dataIndex: 'address',
		  key: 'address',
		}, {
		  title: '操作',
		  key: 'operation',
		  render: (text, record) => (
		    <span>
		      <a href="#">操作一{record.name}</a>
		      <span className="ant-divider"></span>
		      <a href="#">操作二</a>
		      <span className="ant-divider"></span>
		      <a href="#" className="ant-dropdown-link">
		        更多 <Icon type="down" />
		      </a>
		    </span>
		  ),
		}];
    return (
      <Table columns={columns} dataSource={userlist} />
    )
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User
