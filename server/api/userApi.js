// var users = require('../api/db').users;
// var base = require('../base');
import formidable from 'formidable'
import { users } from '../api/db'
import { getTime, getColor, getId } from '../../common/base/index'

/* users */
export function getAllUser(callback){
    users.find()
      .sort({'_id':-1}).exec(function(err, result) {
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

export function addUser(json,callback){
    json.id = getId();
    json.color = getColor();
    json.registered = getTime();
    var u = new users(json);
    u.save(function(err,result){
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

export function deleteUserById(id,callback){
    users.remove({id:id},function(err,result){
        var callbackJson = {};
        console.log(result);
        if(err){
            // console.error(err);
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

export function checkUserByName(name,callback){
    users.find({name:name},function(err,result){
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
  // users
  app.get('/user/getAll',function(req,res){
    getAllUser(function(result){
      res.json(result);
    })
  });

  app.get('/user/login',function(req,res){
    var params = require("url").parse(req.url, true).query;
    if(params&&params.username){
      checkUserByName(params.username,function(result){
        // res.json(result);
        if(result.type){
          if(result.attr.length > 0){
            var attr = result.attr;
            result.attr = attr[0];
            res.json(result);
          }else{
            addUser({
              "name": params.username
            },function(result) {
              res.json(result);
            })
          }
        }else{
          res.json(result);
        }
      })
    }else{
      res.json({
        type: 0,
        msg: "用户名不能为空"
      });
    }
  });

  app.get('/user/save',function(req,res){
    var params = require("url").parse(req.url, true).query;
    if(params&&params.username){
      addUser({
        "name": params.username
      },function(result) {
        res.json(result);
      })
    }else{
      res.json({
        type: 0,
        msg: "用户名不能为空"
      });
    }
  });

  app.post('/user/save', function(req,res){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      console.log(JSON.stringify(fields));
      console.log(JSON.stringify(files));
      if(fields&&fields.username){
        addUser({
          "name": fields.username
        },function(result) {
          res.json(result);
        })
      }else{
        res.json({
          type: 0,
          msg: "用户名不能为空"
        });
      }
    })
    
  });

  app.get('/user/delete',function(req,res){
    var params = require("url").parse(req.url, true).query;
    if(params&&params.id){
      deleteUserById(params.id,function(result) {
        res.json(result);
      })
    }else{
      res.json({
        type: 0,
        msg: "id不能为空"
      });
    }
  });


}

