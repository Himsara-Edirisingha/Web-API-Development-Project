const express = require("express");
const bodyParser = require("body-parser");
const { PERMISSION , USER_TYPES } = require("../../service/enums/enums");
const {
  authPermission,authUserType,authenticateToken
} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/weather-station-controller");
const authcontroller = require("../../service/controllers/token-controller");

const router = express.Router();
router.use(bodyParser.json());

router.get(
  "/",authenticateToken,
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
  authPermission(PERMISSION.DELETE),
  authUserType([USER_TYPES.ADMIN]),
  controller.remove
);

router.put(
  "/:id",
  authenticateToken,
  authPermission(PERMISSION.UPDATE),
  authUserType([USER_TYPES.ADMIN]),
  controller.update
);

module.exports = router;
