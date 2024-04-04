const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());

const { PERMISSION , USER_TYPES } = require("../../service/enums/enums");
const {
  authPermission,authUserType,authenticateToken
} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/metrics-data-controller");


/**
 * @swagger
 * /api/route/path:
 *   get:
 *     description: Get something
 *     responses:
 *       '200':
 *         description: A successful response
 */


router.get("/",authenticateToken, controller.get);

router.post("/",authenticateToken, controller.create);

router.get("/data", controller.getLatestMetricsData);

router.get("/:id",authenticateToken, controller.getbyid);

router.delete("/:id",authenticateToken, controller.remove);

router.put("/:id",authenticateToken, controller.update);



module.exports = router;
