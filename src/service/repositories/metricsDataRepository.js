const MetricsData = require('../models/metricsdataModel');

const getMatrixData = async () => {
    return await MetricsData.find({});
};

const getMetrixDataById = async (id) => {
    return await MetricsData.findOne({_id:id});
};

const createMatrixData = async (matrixData) => {
    return await MetricsData.create(matrixData);
};

const deleteMatrixDataId = async (id) => {
    return await MetricsData.findByIdAndDelete(id);
};

const updateMatrixData = async (id, updatedData) => {
    return await MetricsData.findByIdAndUpdate(id, updatedData, { new: true });
};

const getLatest = async () => {
    return await MetricsData.aggregate([
        { $sort: { timestamp: -1 } },
        {
            $group: {
                _id: '$stationId',
                latestData: { $first: '$$ROOT' },
            },
        },
    ]);
};

module.exports = {
    getMatrixData,
    getMetrixDataById,
    createMatrixData,
    deleteMatrixDataId,
    updateMatrixData,
    getLatest
};