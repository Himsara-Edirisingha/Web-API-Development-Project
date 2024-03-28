const express = require("express");
const bodyParser = require("body-parser");
const { PERMISSION , USER_TYPES } = require("../../service/enums/enums");
const {
  authenticateToken
} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/weather-station-controller");
const authcontroller = require("../../service/controllers/token-controller");

const router = express.Router();
router.use(bodyParser.json());

router.get(
  "/",
  controller.get
);

router.post("/auth", authcontroller.authDevices);

router.post(
  "/",
  controller.create
);

router.get(
  "/:id",
  controller.getById
);

router.delete(
  "/:id",authenticateToken,
  controller.remove
);

router.put(
  "/:id",
  authenticateToken,
  controller.update
);

module.exports = router;
