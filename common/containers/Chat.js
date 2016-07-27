import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import client from 'socket.io-client'
import antd, { Row, Col, Card} from 'antd'

import { fetchLoginUser, setSocket} from '../actions'
import Login from '../components/Login'
import ChatUserList from '../components/ChatUserList'
import MessageList from '../components/MessageList'
import InputMessage from '../components/InputMessage'


class Chat extends Component{

	constructor(props) {
	    super(props)
	    this.state = {
	    	login: !this.props.user.id ,
	    	userlist: [],
	    	chatList: { name: 'all', id: '1'},
	    	messages: []
	    }
	    this.commitName = this.commitName.bind(this);
	    this.changeUser = this.changeUser.bind(this);
	    this.sendMessage = this.sendMessage.bind(this);
	    this.infoNumChange = this.infoNumChange.bind(this);
	 }

	componentWillUpdate(props){
	    var that = this;
		if(props.user.id&&!props.user.socket){
		    //建立websocket连接
		    var socket = client();
		    // that.socket = io.connect('http://localhost:3000');
		     //收到server的连接确认
		    socket.on('open', function() {
		        socket.emit('userLogin',props.user);
		    });

		    //监听system事件，判断welcome或者disconnect，打印系统消息信息
		    socket.on('system', function(json) {
		        if(json.type == 'login'){
		            antd.notification.info({
		                message: '用户登录',
		                description: 'welcome: ' + json.name
		            })
		        }else{
		            antd.notification.info({
		                message: '用户退出',
		                description: 'goodbye: ' + json.name
		            })
		        }
		    });

		    //监听message事件，打印消息信息
		    socket.on('message', function(json) {
		        console.log(json);
		        json.messageType = "message";
		        that.setState({
		            messages:that.state.messages.concat([json])
		        });

		        // all
		        that.infoNumChange(json);
		    });

		    // 监听用户列表
		    socket.on('users', function(json) {
		        json.unshift({name:'全部',id:'1'});
		        var userlist = [];
		        for (var i = 0; i < json.length; i++) {
		           var t = json[i];
		           t.infoNum = 0;
		           for (var j = 0; j < that.state.userlist.length; j++) {
		              var ht = that.state.userlist[j];
		              if(ht.id == t.id){
		                t.infoNum = ht.infoNum;
		                break;
		              }
		            }
		            userlist.push(t);
		        }
	        	that.setState({
		            userlist: userlist
		        });
		    });

		    // 数据保存到redux
		    props.setSocket(socket);
	    }
  	}

	commitName(value){
	    console.log(value);
	    this.setState({
	      	login:false
	    });
	    this.props.fetchLoginUser(value);
	}

	changeUser(chatList){
		var userlist = this.state.userlist;
		for (var i = 0; i < userlist.length; i++) {
			var t = userlist[i];
			if(t.id == chatList.id){
				t.infoNum = 0;
			}
		}

		this.setState({
			chatList,
			userlist
		})
	}
	sendMessage(msg){
		this.props.user.socket.emit('message',msg);
	}

	infoNumChange(json){
		console.log(json);
		var userlist = this.state.userlist;
		for (var i = 0; i < userlist.length; i++) {
			var t = userlist[i];
			if(t.id == "1"&&this.state.chatList.id != "1"){
				t.infoNum = (t.infoNum||0) + 1;
			}
			
			if(t.id != this.props.user.id&&t.id != "1"&&this.state.chatList.id != json.fromId&&json.fromId == t.id&&json.toId == this.props.user.id){
				t.infoNum = (t.infoNum||0) + 1;
			}
		}
		this.setState({
	        userlist
	    });
    }

	render(){
		// const {userlist, fetchDeleteUser, fetchAddUser} = this.props;
		return(
			<div>
				<Login onSubmitFun={this.commitName} login={this.state.login}/>
				<div className="content" style={{display: this.state.login?"none":"block"}}>
					<Row>
                      <Col span={5}>
                      	<ChatUserList changeUser={this.changeUser} user={this.props.user} userlist={this.state.userlist}/>
                      </Col>
                      <Col span={19}>
                      	<Card title={this.props.user.name + '-to-' + this.state.chatList.name}>
                            <MessageList myName={this.props.user.name} myId={this.props.user.id} toName={this.state.chatList.name} toId={this.state.chatList.id} messages={this.state.messages}>
                            </MessageList>
                            <InputMessage toId={this.state.chatList.id} toName={this.state.chatList.name} onSubmitMsg={this.sendMessage}/>
                        </Card>
                      </Col>
                    </Row>
				</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
  return {
    user: state.user||{
    	name: "游客",
    	color: "red",
    	id: "",
    	socket: false
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchLoginUser, setSocket}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat)
