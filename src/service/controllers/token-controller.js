const jwt = require("jsonwebtoken");
require("dotenv").config();
const WeatherStationService = require("../services/weatherStationService")
const UserService = require("../services/userService")
const { PERMISSION, USER_TYPES } = require("../enums/enums");


async function authDevices(req, res) {
    const dname = req.body.dname;
    const apiKey = req.body.apiKey;
    try {
        const weatherStation = await WeatherStationService.authDevice(dname,apiKey);
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

async function authUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await UserService.authUser(username,password);
        if (!user) {
            return res.status(404).json({ error: "Authentication Failed" });
        }
        const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ token: accessToken });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}





module.exports = {
    authDevices: authDevices,
    authUser:authUser

};
