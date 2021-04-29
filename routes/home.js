const router = require('express').Router();
const client = require('../backend/redis-client.js');
var fs = require('fs'), JSONStream = require('JSONStream');

router.route('/').get((req, res) => {
    let name = req.body.name;

    //client.hgetall(name, function(err, obj){
        //if(!obj){
            //console.log('no object'+err);
        //} else {
            //console.log('object found'+obj);
        //}
    //});
});

router.route('/chart').post((req, res) => {
    //res.status(200);
    
    const name = req.body.name;
    const nameSex = req.body.nameSex;
    const targetSex = req.body.targetSex;

    fs.readFile('./data/rank_all_years_f.json', 'utf8', (err, fileContents) => {
        if (err) {
          console.error(err)
          return
        }
        try {
          const data = JSON.parse(fileContents)
          var i;
          var years = []
          var ranks = []
          for (i=1880; i < 2020; i++) {
            years.push(i);
            ranks.push(data[i.toString()][name]);
          }
          var nameData = [years, ranks];
          res.json(nameData)
        } catch(err) {
          console.error(err)
        }
      })

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