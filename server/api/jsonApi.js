import url from 'url';
import fs from 'fs';

export function jsonApi(app){

    app.get('/json',function(req,res){
        var params = url.parse(req.url, true).query;
        if(params&&params.file){
            if(params.file != "test1.json"&&params.file != "test2.json"){
                res.json({
                    type: 0,
                    msg: "文件不存在"
                });
            }else{
                fs.readFile('./common/json/' + params.file,function(err,data){
                    if(err){
                        res.json({
                            type: 0,
                            msg: "文件读取失败"
                        });
                        throw err
                    }else{
                        var data = JSON.parse(data);
                    
                        res.json({
                            type: 1,
                            msg: "文件读取成功",
                            data
                        })
                    }
                });
            }
        }else{
            res.json({
                type: 0,
                msg: "文件名不能为空"
            });
        }
    });

}