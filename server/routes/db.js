var express = require('express');
var router = express.Router();

const db = require('oracledb');
const config = {
    user : "system",
    password : "oracle",
    connectString : "localhost:1521"
};

db.getConnection(config, (err,con)=> {
  if(err){
    console.log(err);
  }
  con.execute("select sysdate from dual", (err ,result) => {
    if(err){
      console.log(err);
      return;
    }
    console.log(result);
  })

})


/* GET users listing. */
router.post('/test', function(req, res, next) {
    db.getConnection(config, (err, conn) => {
        toDo(req, res, err, conn);
    })

});

function toDo(req,res, err, conn){
    if(err){
        console.log(err);
        return err;
    }

    console.log("QUERY" + req.body.query);
    conn.execute(req.body.query, (err, result) => {
        if(err){
            res.send(err);
            return;
        }
        res.send(result);
        console.log(result);
    });
}

module.exports = router;
