'use strict'

var router = {};
var dataHandlerClass = require('./dataHandler')
var dataHandler = new dataHandlerClass();
var imageFetcher = require('./imageFetcher');

router.route = function(app) {
  app.get(`/getData`, (req, res) => {
    dataHandler.fetchAllData(req, res);
  });
  app.get(`/getBgImage`, (req, res) => {
    imageFetcher.fetchImage(req, res);
  });
}


module.exports = router;
