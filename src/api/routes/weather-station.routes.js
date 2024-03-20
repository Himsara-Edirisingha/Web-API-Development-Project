const express = require("express");
const bodyParser = require("body-parser");
const { PERMISSION , USER_TYPES } = require("../../service/enums/enums");
const {
  authPermission,authUserType
} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/weather-station-controller");

const router = express.Router();
router.use(bodyParser.json());

router.get(
  "/",
  authPermission(PERMISSION.READ),
  authUserType([USER_TYPES.ADMIN]),
  controller.get
);

router.post(
  "/",
  authPermission(PERMISSION.WRITE),
  authUserType([USER_TYPES.ADMIN]),
  controller.create
);

router.get(
  "/:id",
  authPermission(PERMISSION.READ),
  authUserType([USER_TYPES.ADMIN]),
  controller.getbyid
);

router.delete(
  "/:id",
  authPermission(PERMISSION.DELETE),
  authUserType([USER_TYPES.ADMIN]),
  controller.remove
);

router.put(
  "/:id",
  authPermission(PERMISSION.UPDATE),
  authUserType([USER_TYPES.ADMIN]),
  controller.update
);

module.exports = router;
