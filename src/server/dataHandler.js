'use strict';

const apiKey = '69317d0df40be68db9dcd92c629cb412';
const fetch = require('node-fetch');
const moment = require('moment');

let dataHandler = function() {
  this.data = {};
};

dataHandler.prototype.getData = () => {
  return this.data;
};

dataHandler.prototype.fetchAllData = (req, res) => {
  var self = this;
  let fetchCurrentURL = `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${
    req.query.lng
  }&appid=${apiKey}`;
  let fetchForeCastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${
    req.query.lat
  }&lon=${req.query.lng}&cnt=9&appid=${apiKey}`;
  let urlList = [fetchCurrentURL, fetchForeCastURL];
  let promiseList = urlList.map(url => fetch(url));
  Promise.all(promiseList).then(results => {
    Promise.all(results.map(res => res.json())).then(data => {
      let resData = {};
      resData.currentWeather = data[0];
      resData.hourlyList = data[1];
      res.send(extractJson(resData));
    });
  });
};

let extractJson = data => {
  var hoursList = {};
  for (let i = 0; i < 9; i++) {
    let timeSecs = data['hourlyList'].list[i].dt;
    hoursList[timeSecs * 1000] = getDataModel(data['hourlyList'].list[i], data['currentWeather']);
    if (i < 8) {
      hoursList[timeSecs * 1000 + 3600000] = {};
      hoursList[timeSecs * 1000 + 7200000] = {};
    }
  }
  return {
    list: getPredictedValues(hoursList),
    sunRise: data['currentWeather'].sys.sunrise * 1000,
    sunSet: data['currentWeather'].sys.sunset * 1000,
    cityName: data['hourlyList'].city.name,
    countryCode: data['hourlyList'].city.country
  };
};

let getPredictedValues = data => {
  let dataKeys = Object.keys(data);
  for (let i = 0; i < 22; i += 3) {
    let startVal = data[i];
    let endVal = data[i + 3];
    data[dataKeys[i + 1]] = getPredictedDataModel(
      'first',
      data[dataKeys[i]],
      data[dataKeys[i + 3]]
    );
    data[dataKeys[i + 2]] = getPredictedDataModel(
      'second',
      data[dataKeys[i]],
      data[dataKeys[i + 3]]
    );
  }
  return data;
};

let getPredictedDataModel = (type, data1, data2) => {
  return {
    cloudPerc:
      type == 'first'
        ? convert2pointsto4(data1.cloudPerc, data2.cloudPerc)[1]
        : convert2pointsto4(data1.cloudPerc, data2.cloudPerc)[2],
    humidity:
      type == 'first'
        ? convert2pointsto4(data1.humidity, data2.humidity)[1]
        : convert2pointsto4(data1.humidity, data2.humidity)[2],
    temp:
      type == 'first'
        ? convert2pointsto4(data1.temp, data2.temp)[1]
        : convert2pointsto4(data1.temp, data2.temp)[2],
    weatherMain: type == 'first' ? data1.weatherMain : data2.weatherMain,
    weatherDescription: type == 'first' ? data1.weatherDescription : data2.weatherDescription,
    windSpeed:
      type == 'first'
        ? convert2pointsto4(data1.windSpeed, data2.windSpeed)[1]
        : convert2pointsto4(data1.windSpeed, data2.windSpeed)[2]
  };
};

let getDataModel = data => {
  return {
    cloudPerc: data.clouds.all,
    humidity: data.main.humidity,
    temp: data.main.temp,
    weatherMain: data.weather[0].main,
    weatherDescription: data.weather[0].description,
    windSpeed: data.wind.speed
  };
};

let convert2pointsto4 = (point1, point2) => {
  let midpoint = (point1 + point2) / 2;
  return [point1, (point1 + midpoint) / 2, (midpoint + point2) / 2, point2];
};

module.exports = dataHandler;
