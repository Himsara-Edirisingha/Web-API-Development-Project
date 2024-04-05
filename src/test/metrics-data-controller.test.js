const { getLatestMetricsData } = require("../service/controllers/metrics-data-controller");
const metricsDataService = require('../service/services/metricsDataService'); 

jest.mock('./metricsDataService', () => ({
    getLatest: jest.fn(),
  }));
  
  describe('getLatestMetricsData function', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return latest metrics data when metricsDataService resolves', async () => {
      const mockLatestData = [{ stationData: { latestData: 'someData' } }];
      metricsDataService.getLatest.mockResolvedValueOnce(mockLatestData);
  
      const mockReq = null;
  
      await getLatestMetricsData(mockReq, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(['someData']);
    });
  
    it('should return 500 and error message when metricsDataService rejects', async () => {
      const mockError = new Error('Test error');
      metricsDataService.getLatest.mockRejectedValueOnce(mockError);
  
      const mockReq = null; 
  
      await getLatestMetricsData(mockReq, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error fetching data' });
    });
  });