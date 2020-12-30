var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lora"
});
var sql = "INSERT INTO node1 (temp, time) VALUES ?";