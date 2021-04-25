const router = require('express').Router();
const client = require('../backend/redis-client.js');
var fs = require('fs'), JSONStream = require('JSONStream');

router.route('/').get((req, res) => {
    let name = req.body.name;

    client.hgetall(name, function(err, obj){
        if(!obj){
            console.log('no object'+err);
        } else {
            console.log('object found'+obj);
        }
    });
});

router.route('/chart').post((req, res) => {
    res.status(200);
    res.end();
    const name = req.body.name;
    const nameSex = req.body.nameSex;
    const targetSex = req.body.targetSex;

    var stream = fs.createReadStream('./data/rank_all_years_f.json', {encoding: 'utf8'}),
    parser = JSONStream.parse('*');
    
    stream.pipe(parser);
    
    parser.on('data', function (obj) {
      console.log(obj);
    })
    
    //res.send("okb");
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: OK }));
    res.end();

});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const nameSex = req.body.nameSex;
    const targetSex = req.body.targetSex;

    //client.hmset(name, [
    //    'name', name
    //], function(err, reply){
    //    if(err){
    //        console.log(err);
    //    }
    //    console.log(reply);
    //
    //});
});

module.exports = router;