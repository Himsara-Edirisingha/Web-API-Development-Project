const WeatherStation = require('../models/weatherstationModel');

const getAllDevices = async () => {
    return await WeatherStation.find({});
};

const getById = async (id) => {
    return await WeatherStation.findOne({ id: id });
};

const getByName = async (dname) => {
    return await WeatherStation.findOne({ name: dname });
};

const createDevice = async (userData) => {
    return await WeatherStation.create(userData);
};

const deleteDeviceById = async (userId) => {
    return await WeatherStation.findByIdAndDelete(userId);
};

const updateDeviceById = async (userId, updatedData) => {
    return await WeatherStation.findByIdAndUpdate(userId, updatedData, { new: true });
};

module.exports = {
    getAllDevices,
    getById,
    createDevice,
    deleteDeviceById,
    updateDeviceById,
    getByName
};