const db = require("../config/db");

exports.getUsers = (req, res) => {

const sql = "SELECT * FROM users";

db.query(sql, (err, result) => {

if (err) {
return res.status(500).json(err);
}

res.json(result);

});

};