import formidable from 'formidable'
import fs from 'fs'

export function fun(app){
	// file upload
	app.post('/file/upload', function(req,res){
		console.log('开始上传');

		console.log(req.body);

		var form = new formidable.IncomingForm();   //创建上传表单
		    form.encoding = 'utf-8';		//设置编辑
		    form.uploadDir = 'static/';	 //设置上传目录
		    form.keepExtensions = true;	 //保留后缀
		    form.maxFieldsSize = 100 * 1024 * 1024;   //文件大小

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
		    console.log(JSON.stringify(fields));
		    console.log(JSON.stringify(files));
		    switch (files.file&&files.file.type) {
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
		    fs.renameSync(files.file.path, newPath);  //重命名

		    res.json({
                type: 1,
                msg: "文件上传成功"
            });
		});

		  	// res.locals.success = '上传成功';

		  	
        }
    );

    // file upload2
	app.post('/api/upload2',function(req,res){
		console.log('开始上传2');

		var form = new formidable.IncomingForm();   //创建上传表单
		    form.encoding = 'utf-8';		//设置编辑
		    form.uploadDir = 'static/';	 //设置上传目录
		    form.keepExtensions = true;	 //保留后缀
		    form.maxFieldsSize = 100 * 1024 * 1024;   //文件大小

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
		    console.log(JSON.stringify(fields));
		    console.log(JSON.stringify(files));
		    switch (files.file&&files.file.type) {
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
		    fs.renameSync(files.file.path, newPath);  //重命名

		    res.json({
                type: 1,
                msg: "文件上传成功"
            });
		});

		  	// res.locals.success = '上传成功';

		  	
        }
    );
}