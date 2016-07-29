import React, { Component, PropTypes } from 'react'
import { Table, Icon } from 'antd';
import { dataFormat } from '../base/index';

class ImageList extends Component {

  render() {
    const { userlist , onDelete } = this.props;
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a href="#">{text}</a>,
    },{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a href="#">{text}</a>,
    }, {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
    }, {
      title: '注册时间',
      dataIndex: 'registered',
      key: 'registered',
      render: (text) => (dataFormat(text,'yyyy-MM-dd hh:mm:ss'))
    }, {
      title: '操作',
      key: 'operation',
      render: (text,record) => (
        <span>
          <a href="#">操作一{record.name}</a>
          <span className="ant-divider"></span>
          <a href="javascript:;" onClick={() => onDelete(record.id)}>删除</a>
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

// { "_id" : ObjectId("5756874df92420a87cc6999f"), "time" : 1465288525389, "color" : "pink", "name" : "王小飞", "id" : 9201, "type" : "disconnect" }

ImageList.propTypes = {
  userlist: PropTypes.array.isRequired,
  // onDelete: PropTypes.func.isRequired
}

export default ImageList
