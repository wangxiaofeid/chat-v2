var messageApi = require('../api/messageApi').fun;
var userApi = require('../api/userApi').fun;
var syslogApi = require('../api/syslogApi').fun;
import { jsonApi } from '../api/jsonApi';
import * as reptileApi from '../api/reptileApi';

import formidable from 'formidable'
import fs from 'fs'

export function createServer(app){
	
	userApi(app);
	messageApi(app);
	syslogApi(app);

	jsonApi(app);

	reptileApi.fun(app);

	// file upload
	app.post('/api/upload',function(req,res){
		console.log('开始上传');

		var form = new formidable.IncomingForm();   //创建上传表单
		    form.encoding = 'utf-8';		//设置编辑
		    form.uploadDir = 'static';	 //设置上传目录
		    form.keepExtensions = true;	 //保留后缀
		    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

		  form.parse(req, function(err, fields, files) {

		    if (err) {
		      res.locals.error = err;
		      
		      res.json({
                type: 0,
                msg: "文件上传失败"
               });
		      return;		
		    }  
		     
		    var extName = '';  //后缀名
		    switch (files.fulAvatar.type) {
		      	case 'image/pjpeg':
		        	extName = 'jpg';
		        	break;
		      	case 'image/jpeg':
		        	extName = 'jpg';
		        	break;		 
		      	case 'image/png':
		        	extName = 'png';
		        	break;
		      	case 'image/x-png':
		        	extName = 'png';
		        	break;		 
		    }

		    if(extName.length == 0){
		        // res.locals.error = '只支持png和jpg格式图片';
		        res.json({
	                type: 0,
	                msg: "只支持png和jpg格式图片"
	            });
		        return;				   
		    }

		    var avatarName = Math.random() + '.' + extName;
		    var newPath = form.uploadDir + avatarName;

		    console.log(newPath);
		    	fs.renameSync(files.fulAvatar.path, newPath);  //重命名
		  	});

		  	// res.locals.success = '上传成功';

		  	res.json({
                type: 1,
                msg: "文件上传成功"
            });
        }
    );

}