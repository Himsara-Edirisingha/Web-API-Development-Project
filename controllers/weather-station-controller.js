const WeatherStation = require('../models/weatherstationModel');

async function get(req,res){
    res.send('<h1> get </h1>')
}

async function getbyid(req,res){
    res.send('<h1> getbyid </h1>')
}


module.exports = {
    get: get,
    getbyid: getbyid,
  };
  