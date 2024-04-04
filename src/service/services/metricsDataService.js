const matricsDataRepository = require('../repositories/metricsDataRepository');

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

const getLatest = async (id, updatedData) => {
    return await matricsDataRepository.getLatest();
};

module.exports = {
    getAllMatricsData,
    getMatricsDataById,
    createMatricsData,
    deleteMatricsData,
    updateMatricsData,
    getLatest
};