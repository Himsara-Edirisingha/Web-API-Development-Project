const jwt = require("jsonwebtoken");
require("dotenv").config();
const WeatherStation = require("../models/weatherstationModel");
const { PERMISSION, USER_TYPES } = require("../enums/enums");


async function authDevices(req, res) {
    const id = req.body.id;
    try {
        const weatherStation = await WeatherStation.findById(id);
        if (!weatherStation) {
            return res.status(404).json({ error: "Authentication Failed" });
        }
        const user = {
            username: weatherStation.name,
            permissions: [PERMISSION.WRITE],
            type: USER_TYPES.DATAWRITER
        };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
       return res.status(200).json({ token: accessToken });

    } catch (err) {
        console.error("Error:", err);
       return res.status(500).json({ error: "Server error" });
    }
}



module.exports = {
    authDevices: authDevices,

};
