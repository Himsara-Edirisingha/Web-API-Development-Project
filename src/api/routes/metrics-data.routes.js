const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());

const { PERMISSION, USER_TYPES } = require("../../service/enums/enums");
const {
  authPermission, authUserType, authenticateToken
} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/metrics-data-controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     MetricsData :
 *       type: object
 *       properties:
 *         stationId:
 *           type: string
 *           description: The ID of the weather station to which the metrics data belongs.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp of the metrics data.
 *         temperature:
 *           type: number
 *           description: The temperature data.
 *         humidity:
 *           type: number
 *           description: The humidity data.
 *         airPressure:
 *           type: number
 *           description: The air pressure data.
 *       required:
 *         - stationId
 *         - timestamp
 *         - temperature
 *         - humidity
 *         - airPressure
 */

/**
 * @swagger
 * tags:
 *   name: Metrics Data
 *   description: API endpoints for managing metrics data
 */



/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Get all metrics data
 *     description: Retrieve all metrics data.
 *     tags: [Metrics Data]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Metrics data retrieved successfully
 *       '401':
 *         description: Unauthorized
 */

router.get("/", authenticateToken, controller.get);

/**
 * @swagger
 * /api/metrics:
 *   post:
 *     summary: Create metrics data
 *     description: Create new metrics data entry.
 *     tags: [Metrics Data]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MetricsData'
 *     responses:
 *       '201':
 *         description: Metrics data created successfully
 *       '401':
 *         description: Unauthorized
 */

router.post("/", authenticateToken, controller.create);

/**
 * @swagger
 * /api/metrics/data:
 *   get:
 *     summary: Get latest metrics data
 *     description: Retrieve the latest metrics data.
 *     tags: [Metrics Data]
 *     responses:
 *       '200':
 *         description: Latest metrics data retrieved successfully
 */
router.get("/data", controller.getLatestMetricsData);

/**
 * @swagger
 * /api/metrics/{id}:
 *   get:
 *     summary: Get metrics data by ID
 *     description: Retrieve metrics data by ID.
 *     tags: [Metrics Data]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the metrics data to retrieve
 *     responses:
 *       '200':
 *         description: Metrics data retrieved successfully
 *       '401':
 *         description: Unauthorized
 */
router.get("/:id", authenticateToken, controller.getbyid);

/**
 * @swagger
 * /api/metrics/{id}:
 *   delete:
 *     summary: Delete metrics data by ID
 *     description: Delete metrics data by ID.
 *     tags: [Metrics Data]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the metrics data to delete
 *     responses:
 *       '200':
 *         description: Metrics data deleted successfully
 *       '401':
 *         description: Unauthorized
 */
router.delete("/:id", authenticateToken, controller.remove);

/**
 * @swagger
 * /api/metrics/{id}:
 *   put:
 *     summary: Update metrics data by ID
 *     description: Update metrics data by ID.
 *     tags: [Metrics Data]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the metrics data to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MetricsData'
 *     responses:
 *       '200':
 *         description: Metrics data updated successfully
 *       '401':
 *         description: Unauthorized
 */
router.put("/:id", authenticateToken, controller.update);

module.exports = router;
