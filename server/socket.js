import socketio from 'socket.io'

import { addMessage } from '../server/api/messageApi'
import { addSyslog } from '../server/api/syslogApi'
import { getTime } from '../common/base/index'


export function createSocket(server,post){
	var clientList = {};

	function getLinkNum(){
	  return Object.keys(clientList).length;
	}
	function getUserList(){
		// 用户列表
	    var arr = [];
	    var keys = Object.keys(clientList);
	    for (var i = 0; i < keys.length; i++) {
	    	var key = keys[i]
		    arr.push({
		        id : clientList[key].id,
		        name : clientList[key].name,
		        color: clientList[key].color
		    });
	    }
	    return arr
	}

	var io = socketio(server);

	io.on('connection', function (socket) {
	  console.log('建立连接');
	  socket.emit('open');//通知客户端已连接
	  // 打印握手信息
	  // console.log(socket.handshake);

	  // 构造客户端对象
	  var client = {
	    socket:socket,
	    name:"游客",
	    color:"red",
	    id:""
	  }
	  // 对message事件的监听
	  socket.on('message', function(data){

	    var obj = {
	      'time': getTime(),
	      'color': client.color,
	      'text': data.msg,
	      'fromName': client.name,      
	      'fromId': client.id,   
	      'toName': data.toName,   
	      'toId': data.toId
	    }
	    console.log(client.name + ' say: ' + data.msg);
	    if(data.toId&&data.toId != 1 &&clientList[data.toId]){
	      socket.emit('message',obj);
	      clientList[data.toId].socket.emit('message',obj);
	    }else{
	      socket.emit('message',obj);
	      socket.broadcast.emit('message',obj);
	    }

	    addMessage(obj,function(){
	      console.log("插入聊天记录成功");
	    });
	    
	  });
	  // 登录
	  socket.on('userLogin', function(obj){
	    client.name = obj.name;
	    client.color = obj.color;
	    client.id = obj.id;
	    console.log("登录信息："+JSON.stringify(obj))
	    var obj = {
	      time:getTime(),
	      color:client.color,
	      name:client.name,
	      id:client.id,
	      type:'login'
	    };

	    clientList[client.id] = client;

	    addSyslog(obj,function(){
	      console.log('添加登录记录成功');
	    });

	    socket.broadcast.emit('system',obj);
	    // 用户列表
	    var arr = getUserList();
	    
	    socket.emit('users', arr);
	    socket.broadcast.emit('users', arr);
	    console.log(client.name + ' login');
	    console.log('在线人数：'+getLinkNum());
	  })
	  //监听出退事件
	  socket.on('disconnect', function () {  
	    var obj = {
	      time:getTime(),
	      color:client.color,
	      name:client.name,
	      id:client.id,
	      type:'disconnect'
	    };

	    // 广播用户已退出
	    socket.broadcast.emit('system',obj);
	    console.log(client.name + 'Disconnect');
	    delete clientList[client.id];
	    // 用户列表
	    var arr = getUserList();

	    addSyslog(obj,function(){});

	    socket.broadcast.emit('users',arr);
	    console.log('在线人数：'+getLinkNum());
	  });
	    
	});

}