import React, { Component, PropTypes } from 'react'
import { Button, Form, Modal, Input } from 'antd';

class UserList extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAdd:false,
      validateStatus:"",
      value:""
    }
    this.doAdd = this.doAdd.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocusBlur = this.handleFocusBlur.bind(this);
    this.handleFocusFocus = this.handleFocusFocus.bind(this);
  }

  doAdd(){
    this.setState({
      isAdd:true
    });

  }

    handleOk() {
    if(this.state.value){
      this.props.onSubmitFun(this.state.value);
      this.setState({
        isAdd:false
      });
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
    // const { userlist , onDelete } = this.props;
       return(
          <div>
            <Button type="primary" onClick={this.doAdd} style={{marginBottom:'20px'}}>添加用户</Button>
            <Modal ref="modal"
              visible={this.state.isAdd}
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
          </div>
        )
    };
}

// { "_id" : ObjectId("5756874df92420a87cc6999f"), "time" : 1465288525389, "color" : "pink", "name" : "王小飞", "id" : 9201, "type" : "disconnect" }

UserList.propTypes = {
  // userlist: PropTypes.array.isRequired,
  onSubmitFun: PropTypes.func.isRequired
}

export default UserList
