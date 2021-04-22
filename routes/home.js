const router = require('express').Router();
const client = require('../chart-my-name/backend/redis-client');

router.route('/').get((req, res) => {
    let name = req.body.name;

    client.hgetall(name, function(err, obj){
        if(!obj){
            console.log('no object');
        } else {
            console.log('object found');
        }
    });
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const nameSex = req.body.nameSex;
    const targetSex = req.body.targetSex;

    client.hmset(name, [
        'name', name
    ], function(err, reply){
        if(err){
            console.log(err);
        }
        console.log(reply);
    });
});

module.exports = router;