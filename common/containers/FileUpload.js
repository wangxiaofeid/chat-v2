import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { Upload, Button, Icon, message, Input } from 'antd'

const props = {
  action: '/file/upload',
  multiple: false,
  beforeUpload(file) {
    // const isJPG = file.type === 'image/jpeg';
    // if (!isJPG) {
    //   message.error('you can only upload JPG file~');
    // }
    // return isJPG;
    // message.info('要上传文件了啦');
    return true
  },
  onChange(data) {
    console.log(data);
  },
  data: {
    username: 'wxf',
    password: 'wxfwxf'
  }
}

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    }
    // console.log(this.props.params);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){

  }

  render() {
    
    return (
      <div>
        
        <br/>
        上传文件
        <Upload {...props}>
          <Button type="ghost">
            <Icon type="upload" /> upload
          </Button>
        </Upload>

        <hr/>

      </div>
    )
  }
}

module.exports = connect()(FileUpload)
