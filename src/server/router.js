'use strict'

var router = {};
var dataHandlerClass = require('./dataHandler')

var dataHandler = new dataHandlerClass();

router.route = function(app) {
  app.get('/getData', (req, res) => {
    console.log('1');
    dataHandler.fetchAllData(req, res);
    // res.send({ express: 'Hello From Express' });
  });
}

module.exports = router;
