// var syslog = require('../api/db').syslog;
import { syslog } from '../api/db'

/* syslog */
export function getAllSyslog(callback){
    syslog.find(function(err, result) {
        var callbackJson = {};
        if(err){
            console.error(err);
            callbackJson.type = 0;
            callbackJson.msg = "数据库操作失败";
        }else{
            callbackJson.type = 1;
            callbackJson.msg = "请求成功";
            callbackJson.attr = result;
            console.log(result);
        }
        callback(callbackJson);
    })
}
// module.exports.getAllSyslog = getAllSyslog;

export function addSyslog(json,callback){
    json.time = base.getTime();

    var m = new syslog(json);
    m.save(function(err,result){
        var callbackJson = {};
        if(err){
            console.error(err);
            callbackJson.type = 0;
            callbackJson.msg = "数据库操作失败";
        }else{
            callbackJson.type = 1;
            callbackJson.msg = "请求成功";
            callbackJson.attr = result;
        }

        callback(callbackJson);
    });
}

export function fun(app){
  app.get('/syslog/getAll',function(req,res){
    getAllSyslog(function(result){
      res.json(result);
    })
  });

}

