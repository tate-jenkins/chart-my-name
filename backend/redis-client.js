const redis = require('redis');

const client = redis.createClient({
    port      : 6379,
    host      : 'localhost'
    //password  : 'password',
});

client.on('error', err=> {
    console.log('Error ' + err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

module.exports = client;