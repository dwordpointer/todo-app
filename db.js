const mysql = require("mysql2");
const config = require("./config.js");

let conn = mysql.createConnection(config.db);
conn.connect(err=>{
    if(err){
        return console.log(err);
    }
    console.log("mysqlconn");
})
module.exports = conn;
