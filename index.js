const express = require('express');
const app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);
// var mqtt = require('mqtt');
const client = require("./model/mqtt");
var mysql = require('mysql');
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static('public'))
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lora"
});
// var firebase = require('firebase');
var dht11 = ""
var bui = ""
var topic1 = "danhtran98/lora/node1"//dht11
var topic2 = "danhtran98/lora/node2" //bui
var topic3 = "danhtran98/lora/node3" //gas

server.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

var sql1 = "INSERT INTO node1 (temp,hum,time) VALUES ?";
var sql2 = "INSERT INTO node2 (bui,time) VALUES ?";
var sql3 = "INSERT INTO node3 (val,time) VALUES ?";
let ts = Date.now();
var dts = Math.floor(ts / 1000)

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected database!!!")
    if (err) throw err;
})
client.subscribe(topic1);
client.subscribe(topic2);
client.subscribe(topic3);
// client.on('connect', function () {
//     //console.log("connected mqtt");
//     client.subscribe(topic1, function (err) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     client.subscribe(topic2, function (err) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     client.subscribe(topic3, function (err) {
//         if (err) {
//             console.log(err);
//         }
//     });
// });
client.on('message', function (topic, message) {
    if (topic == topic1) {
        dht11 = message.toString();
        console.log(message)
        var objdht = JSON.parse(dht11);
        temp = objdht.temprature
        hum = objdht.hum
        console.log(temp);
        console.log(hum);
        console.log(".....")
        var rawdht11 = [
            [temp, hum, dts]
        ];
        con.query(sql1, [rawdht11], function (err, results) {
            if (err) throw err;
            console.log(results);

        })

    }
    if (topic == topic2) {
        bui = message.toString();
        var objbui = JSON.parse(bui);
        buivl = objbui.d;
        console.log(buivl);
        console.log(".....")
        var rawbui = [
            [buivl, dts]
        ];
        con.query(sql2, [rawbui], function (err, results) {
            if (err) throw err;
            console.log(results);

        })

    }
    if (topic == topic3) {
        var gas = message.toString();
        var rawgas = JSON.parse(gas);
        val = rawgas.mq135;
        console.log(val);
        console.log(".....")
        var vlgas = [
            [val, dts]
        ];
        con.query(sql3, [vlgas], function (err, results) {
            if (err) throw err;
            console.log(results);

        })

    }
});

io.on('connection', (socket) => {
    setInterval(function () {
        //console.log('a user connected');
        con.query("SELECT bui, time FROM node2 ORDER BY id DESC LIMIT 1", function (err, results) {
            if (err) {
                throw err;
            }
            else {
                var string2 = JSON.stringify(results);
                var buiraw = JSON.parse(string2);
                // var bui = buiraw[0].temp;
                // var buitime = buiraw[0].time;
                // console.log('>> json: ', bui);
                socket.emit("bui", string2)
                //console.log(string)
                //socket.emit("buitime", buitime)
            }
        })
        con.query("SELECT temp,hum, time FROM node1 ORDER BY id DESC LIMIT 1", function (err, results) {
            if (err) {
                throw err;
            }
            else {
                var string1 = JSON.stringify(results);
                var buiraw = JSON.parse(string1);
                // var bui = buiraw[0].temp;
                // var buitime = buiraw[0].time;
                // console.log('>> json: ', bui);
                socket.emit("node1", string1)
                //console.log(string)
                //socket.emit("buitime", buitime)
            }
        })
        con.query("SELECT val, time FROM node3 ORDER BY id DESC LIMIT 1", function (err, results) {
            if (err) {
                throw err;
            }
            else {
                var string3 = JSON.stringify(results);
                var buiraw = JSON.parse(string3);
                // var bui = buiraw[0].temp;
                // var buitime = buiraw[0].time;
                // console.log('>> json: ', bui);
                socket.emit("node3", string3)
                //console.log(string)
                //socket.emit("buitime", buitime)
            }
        })
    }, 1000);


});

app.get("/index", function (req, res) {
    res.render("index");
});
app.get("/chart2", function (req, res) {
    res.render("chart2");
});



