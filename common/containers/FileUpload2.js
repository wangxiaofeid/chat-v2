import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { Form, Input, Button, Icon } from "antd";
const FormItem = Form.Item;
import ajaxUploader from "../lib/ajaxUploader";

const props = {
  action: "/file/upload",
  multiple: false,
  beforeUpload(file) {
    // const isJPG = file.type === 'image/jpeg';
    // if (!isJPG) {
    //   message.error('you can only upload JPG file~');
    // }
    // return isJPG;
    // message.info('要上传文件了啦');
    return true;
  },
  onChange(data) {
    console.log(data);
  }
};

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
    // console.log(this.props.params);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Received values of form:", this.props.form.getFieldsValue());

    let data = this.props.form.getFieldsValue();
    var file = data.file;
    delete data.file;

    ajaxUploader({
      action: "/file/upload",
      filename: "file",
      file: Array.prototype.slice.call(
        document.getElementById("file").files
      )[0],
      data: data,
      onSuccess: function(response, file) {
        console.log(response);
      },
      onError: function(error) {
        console.log(error);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormItem label="Account">
            {getFieldDecorator("userName", { initialValue: "wxf" })(
              <Input placeholder="Please input the account" />
            )}
          </FormItem>
          <FormItem label="Account">
            {getFieldDecorator("userCode", { initialValue: "wxf" })(
              <Input placeholder="Please input the account" />
            )}
          </FormItem>
          <FormItem label="上传文件（自己）">
            {getFieldDecorator("file")(<Input type="file" />)}
          </FormItem>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

module.exports = connect()(Form.create()(FileUpload));
