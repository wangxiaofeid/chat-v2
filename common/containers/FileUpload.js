import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { Upload, Button, Icon, message } from 'antd'

const props = {
  action: 'api/upload',
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
  }
}

class FileUpload extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.params);
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
      </div>
    )
  }
}

module.exports = connect()(FileUpload)
