const express = require('express');
const bodyParser = require("body-parser");
const { PERMISSION , USER_TYPES } = require("../../service/enums/enums");
const {
  authenticateToken
} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/metrics-data-controller");


const router = express.Router();
router.use(bodyParser.json());

router.get("/",authenticateToken, controller.get);

router.post("/",authenticateToken, controller.create);

router.get("/data", controller.getLatestMetricsData);

router.get("/:id",authenticateToken, controller.getbyid);

router.delete("/:id",authenticateToken, controller.remove);

router.put("/:id",authenticateToken, controller.update);



module.exports = router;
