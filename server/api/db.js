// var mongoose = require("mongoose");
// var base = require("../../common/base/index");
import mongoose from 'mongoose'
import base from '../../common/base/index'

// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://localhost/chat');

// 数据库连接后，可以对open和error事件指定监听函数。
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	console.log('Mongo连接成功')
		//在这里创建你的模式和模型
});

var Schema = mongoose.Schema;

module.exports.users = mongoose.model('users', new Schema({
    "name" : String, 
    "id" : String, 
    "color" : String, 
    "registered" : Number
}));

module.exports.messages = mongoose.model('messages', new Schema({
    "time" : Number, 
    "color" : String, 
    "text" : String, 
    "fromName" : String, 
    "formId" : String, 
    "toName" : String, 
    "toId" : String
}));

module.exports.syslog = mongoose.model('syslog', new Schema({
    "time" : Number, 
    "color" : String, 
    "name" : String, 
    "id" : String, 
    "type" : String
}));