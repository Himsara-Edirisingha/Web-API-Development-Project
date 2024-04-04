const bcrypt = require('bcrypt')
const weatherStation = require('../repositories/weatherStationRepository');


const getAllDevices = async () => {
    return await weatherStation.getAllDevices();
};

const getDeviceById = async (id) => {
    return await weatherStation.getById(id);
};

const createDevice = async (deviceData) => {
    const device = deviceData;
    const salt = await bcrypt.genSalt(10);
    device.apiKey = await bcrypt.hash(deviceData.name,salt)
    return await weatherStation.createDevice(device);
};

const deleteDeviceById = async (id) => {
    return await weatherStation.deleteDeviceById(id);
};

const updateDeviceById = async (id, updatedData) => {
    return await weatherStation.updateDeviceById(id, updatedData);
};

const authDevice = async (dname, apiKey) => {
  
    const station = await weatherStation.getByName(dname);
    if(!station){
        return null; 
    }
    if (await bcrypt.compare(station.name, apiKey)) {
        return station;
    }
    return null;

}

module.exports = {
    getAllDevices,
    getDeviceById,
    createDevice,
    deleteDeviceById,
    updateDeviceById,
    authDevice
};