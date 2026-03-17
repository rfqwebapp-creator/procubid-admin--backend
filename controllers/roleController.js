const db = require("../config/db");

exports.getRoles = (req,res)=>{

const sql = "SELECT * FROM roles";

db.query(sql,(err,result)=>{

 if(err){
  return res.status(500).json(err);
 }

 res.json(result);

});

};