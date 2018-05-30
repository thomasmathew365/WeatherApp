'use strict'

const apiKey = '69317d0df40be68db9dcd92c629cb412'
const fetch = require('node-fetch');

let dataHandler = function() {
  this.data = {};
};

dataHandler.prototype.fetchAllData = function(req, res) {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=bengaluru,in&appid=${apiKey}`)
  .then((res) => { return res.json()})
  .then((data)=> { res.send(data)})
  .catch(err => {
    res.status(500).send(err);
  })
};


module.exports = dataHandler;
