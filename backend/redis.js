var Redis = require('ioredis');

require('dotenv').config();

var client = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});

client.on('connect', function() {
    console.log('✅ Connected to Redis');
});

client.on('error', function(err) {
    console.log('❌ Error: ' + err);
});

module.exports = client;
