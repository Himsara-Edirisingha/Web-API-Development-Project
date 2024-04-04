const express = require("express");
const bodyParser = require("body-parser");
const { PERMISSION, USER_TYPES } = require("../../service/enums/enums");
const { authPermission, authUserType, authenticateToken } = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/weather-station-controller");
const authcontroller = require("../../service/controllers/token-controller");

const router = express.Router();
router.use(bodyParser.json());

/**
 * @swagger
 * tags:
 *   name: Weather Station
 *   description: API endpoints for managing weather stations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WeatherStation:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         district:
 *           type: string
 *         coordinates:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *         lastUpdate:
 *           type: string
 *           format: date-time
 *         apiKey:
 *           type: string
 *       required:
 *         - name
 *         - location
 *         - district
 *         - coordinates
 *         - lastUpdate
 *         - apiKey
 */

/**
 * @swagger
 * paths:
 *   /api/weather:
 *     get:
 *       summary: Get all weather stations
 *       description: Retrieve a list of all weather stations.
 *       tags: [Weather Station]
 *       responses:
 *         '200':
 *           description: A list of weather stations.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/WeatherStation'
 */

router.get(
  "/",
  // authenticateToken,
  controller.get
);

/**
 * @swagger
 * paths:
 *   /api/weather/auth:
 *     post:
 *       summary: Authenticate Weather Station
 *       description: Authenticate a weather station to obtain access token.
 *       tags: [Weather Station]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dname:
 *                   type: string
 *                 apiKey:
 *                   type: string
 *               required:
 *                 - dname
 *                 - apiKey
 *       responses:
 *         '200':
 *           description: Authentication successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *         '404':
 *           description: Authentication failed
 */

router.post("/auth", authcontroller.authDevices);

/**
 * @swagger
 * paths:
 *   /api/weather:
 *     post:
 *       summary: Create a new weather station
 *       description: Create a new weather station with the provided data.
 *       tags: [Weather Station]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeatherStation'
 *       responses:
 *         '201':
 *           description: Weather station created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/WeatherStation'
 */

router.post(
  "/",
  controller.create
);

/**
 * @swagger
 * paths:
 *   /api/weather/{id}:
 *     get:
 *       summary: Get weather station by ID
 *       description: Retrieve weather station details by ID.
 *       tags: [Weather Station]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Weather station found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/WeatherStation'
 *         '404':
 *           description: Weather station not found
 */

router.get(
  "/:id",
  controller.getById
);

/**
 * @swagger
 * paths:
 *   /api/weather/{id}:
 *     delete:
 *       summary: Delete weather station by ID
 *       description: Delete a weather station by ID.
 *       tags: [Weather Station]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Weather station deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/WeatherStation'
 *         '404':
 *           description: Weather station not found
 */

router.delete(
  "/:id",
  authenticateToken,
  authPermission(PERMISSION.DELETE),
  authUserType([USER_TYPES.ADMIN]),
  controller.remove
);

/**
 * @swagger
 * paths:
 *   /api/weather/{id}:
 *     put:
 *       summary: Update weather station by ID
 *       description: Update weather station details by ID.
 *       tags: [Weather Station]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeatherStation'
 *       responses:
 *         '200':
 *           description: Weather station updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/WeatherStation'
 *         '404':
 *           description: Weather station not found
 */

router.put(
  "/:id",
  authenticateToken,
  authPermission(PERMISSION.UPDATE),
  authUserType([USER_TYPES.ADMIN]),
  controller.update
);

module.exports = router;
