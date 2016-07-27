import React, { Component, PropTypes } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      validateStatus:"",
      value:""
    }
    this.handleOk = this.handleOk.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocusBlur = this.handleFocusBlur.bind(this);
    this.handleFocusFocus = this.handleFocusFocus.bind(this);
  }

  handleOk() {
    if(this.state.value){
        setTimeout(() => {
          // this.setState({visible: false }); 
          this.props.onSubmitFun(this.state.value);
        }, 1000);
    }else{
        this.setState({
          validateStatus:"error"
        });
    }
  }

  handleInputChange(e){
    this.setState({ value: e.target.value });
  }

  handleFocusBlur(e) {
    if(!e.target.value){
        this.setState({
          validateStatus:"error"
        });
    }
  }

  handleFocusFocus(e) {
    this.setState({
      validateStatus:""
    });
  }

  render() {
    const { login } = this.props
    return (
      <Modal ref="modal"
        visible={login}
        title="输入用户名" 
        closable={false} 
        footer="">
        <Form horizontal>
          <Form.Item
            label="用户名："
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            validateStatus={this.state.validateStatus}
            help="请输入用户名" 
            >
            <Input value={this.state.value} onFocus={this.handleFocusFocus} onBlur={this.handleFocusBlur} onChange={this.handleInputChange} id="error"/>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit" onClick={this.handleOk}>确定</Button>
          </Form.Item>
          </Form>
      </Modal>
    )
  }
}

Counter.propTypes = {
  // increment: PropTypes.func.isRequired,
  // incrementIfOdd: PropTypes.func.isRequired,
  // incrementAsync: PropTypes.func.isRequired,
  onSubmitFun: PropTypes.func.isRequired,
  login: PropTypes.bool.isRequired
}

export default Counter
