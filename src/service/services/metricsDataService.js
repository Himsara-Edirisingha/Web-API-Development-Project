const matricsDataRepository = require('../repositories/metricsDataRepository');
const weatherDataRepository = require('../repositories/weatherStationRepository');

const getAllMatricsData = async () => {
    return await matricsDataRepository.getAllUsers();
};

const getMatricsDataById = async (id) => {
    return await matricsDataRepository.getMetrixDataById(id);
};

const createMatricsData = async (matricsData) => {
    return await matricsDataRepository.createMatrixData(matricsData);
};

const deleteMatricsData = async (id) => {
    return await matricsDataRepository.deleteMatrixDataId(id);
};

const updateMatricsData = async (id, updatedData) => {
    return await matricsDataRepository.updateMatrixData(id, updatedData);
};

const getLatest = async () => {
    const weatherData = await matricsDataRepository.getLatest();
    await Promise.all(weatherData.map(async (data) => {
        console.log(data)
        const station = await weatherDataRepository.getById(data.latestData.stationId.toString());
        data.latestData.StatName = station.name;
    }));
    
    return weatherData;
};

module.exports = {
    getAllMatricsData,
    getMatricsDataById,
    createMatricsData,
    deleteMatricsData,
    updateMatricsData,
    getLatest
};