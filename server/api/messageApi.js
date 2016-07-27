// var messages = require('../api/db').messages;
import { messages } from '../api/db'
import { getTime} from '../../common/base/index'

/* message */
export function getAllMessage(callback){
    messages.find(function(err, result) {
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
    })
}

export function addMessage(json,callback){
    json.time = getTime();
    // 'time': getTime(),
    // 'color': client.color,
    // 'text': data.msg,
    // 'fromName': client.name,      
    // 'fromId': client.id,   
    // 'toName': data.toName,   
    // 'toId': data.toId

    var m = new messages(json);
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
  app.get('/message/getAll',function(req,res){
    getAllMessage(function(result){
      res.json(result);
    })
  });

}

