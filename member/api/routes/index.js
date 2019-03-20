var express = require('express');
var router = express.Router();
var mongo = require("mongodb-curd");

var db = "1612B";
var col = "user";

/* 查询所有成员信息 */
router.get('/api/getUser', function(req, res, next) {
  mongo.find(db,col,function(result){
    if(!result){
      res.json({code:0,msg:"查询错误！"});
    }else{
      res.json({code:1,data:result});
    }
  })
});

/* 查询具体成员信息 */
router.post('/api/getUserDetailt', function(req, res, next) {
  var id = req.body.id;
  if(!id){   
    res.json({code:3,msg:"参数为空！"})
  }else{
    mongo.find(db,col,{"_id":id},function(result){
      if(result.length === 0){
        res.json({code:0,msg:"查无此人！"})
      }else{
        res.json({code:1,data:result})
      }
    })
  }
});

/* 模糊查询具体成员信息 */
router.post('/api/getUserSea', function(req, res, next) {
  var name = new RegExp(req.body.name);
  if(!name){   
    res.json({code:3,msg:"参数为空！"})
  }else{
    mongo.find(db,col,{"name":name},function(result){
      if(result.length === 0){
        res.json({code:0,msg:"查无此人！"})
      }else{
        res.json({code:1,data:result})
      }
    })
  }
});

/* 删除具体成员信息 */
router.post('/api/deleteUser', function(req, res, next) {
  var id = req.body.id;
  if(!id){   
    res.json({code:3,msg:"参数为空！"})
  }else{
    mongo.remove(db,col,{"_id":id},function(result){
      if(!result){
        res.json({code:0,msg:"删除错误！"})
      }else{
        res.json({code:1,msg:"删除成功！"})
      }
    })
  }
 
});

/* 修改具体成员信息 */
router.post('/api/updateUser', function(req, res, next) {
  var id = req.body.id;
  var obj = req.body;
  delete obj.id;
  console.log(obj)

  if(!id){
    res.json({code:3,msg:"参数为空！"})
  }else{
    mongo.update(db,col,[{"_id":id},obj],function(result){
      if(!result){
        res.json({code:0,msg:"更改失败！"})
      }else{
        res.json({code:1,msg:"更改成功！"})
      }
    })
  }
  
});


/* 添加成员信息 */
router.post('/api/insertUser', function(req, res, next) {
  var obj = req.body;
  if(!obj.name && !obj.sex && !obj.age){
    res.json({code:3,msg:"参数为空！"})
  }else{
    mongo.insert(db,col,obj,function(result){
      if(!result){
        res.json({code:0,msg:"添加失败！"})
      }else{
        res.json({code:1,msg:"添加成功！"})
      }
    })
  }
  
});

module.exports = router;
