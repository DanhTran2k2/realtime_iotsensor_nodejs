var mqtt = require('mqtt');

options = {
    clientId: "mqttjs01",
    username: "tiger",
    password: "9898",
    clean: true
};

var client = mqtt.connect('mqtt://dthings.mooo.com:1883', options);
client.setMaxListeners(100);

module.exports = client;