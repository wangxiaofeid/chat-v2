import React, { Component, PropTypes } from 'react'
import { Form, Input, Button } from 'antd'

class InputMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {
    if(this.state.value){
      // this.props.onSubmitMsg({
      //   toId:this.props.toId,
      //   toName:this.props.toName,
      //   msg:this.state.value
      // });
      this.props.onSubmitMsg(this.state.value);
      !this.props.save&&this.setState({ value: "" });
    }
  }

  handleInputChange (e){
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
          <Form inline>
            <Form.Item label="">
              <Input style={{width:'400px'}} value={this.state.value} onChange={this.handleInputChange} placeholder="请输入"/>
            </Form.Item>
            <Button type="primary" htmlType="submit" onClick={this.handleOk}>提交</Button>
          </Form>
      </div>
    );
  }
}

InputMessage.propTypes = {
  // changeUser: PropTypes.func.isRequired,
  // incrementIfOdd: PropTypes.func.isRequired,
  // incrementAsync: PropTypes.func.isRequired,
  onSubmitMsg: PropTypes.func.isRequired,
  save: PropTypes.bool
  // login: PropTypes.bool.isRequired
}

export default InputMessage
