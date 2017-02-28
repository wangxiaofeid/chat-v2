import React, { Component, PropTypes } from 'react'
import { Form, Row, Col, Button,Checkbox } from 'antd'

const FormItem = Form.Item;

class UserList extends Component{
	constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this)
    this.getData = this.getData.bind(this)
  }
	componentWillMount(){
	}

	handleReset(){
    this.props.form.resetFields([
    	'master'
    ]);
  }

  getData(){
  	console.log(this.props.form.getFieldsValue());
  }

	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
		return(
			<div>

          <Row gutter={10}>
            <Col span={4}>
              <FormItem {...formItemLayout} label="是否户主">
                {getFieldDecorator("master")(
                  <Checkbox />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={8} style={{textAlign: 'right'}}>
              <Button type="primary" htmlType="submit" onClick={this.getData}>查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                重置
              </Button>
            </Col>
          </Row>
			</div>
		)
	}
}

export default Form.create()(UserList)
