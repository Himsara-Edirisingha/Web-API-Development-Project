const express = require("express");
const bodyParser = require("body-parser");
const { PERMISSION, USER_TYPES } = require("../../service/enums/enums");
const {
  authenticateToken,
  authPermission,
  authUserType,
} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/user-controller");

const router = express.Router();
router.use(bodyParser.json());

router.get(
  "/",
  authenticateToken,
  authPermission(PERMISSION.READ),
  authUserType([USER_TYPES.ADMIN, USER_TYPES.REGISTERED]),
  controller.get
);

router.post("/", controller.create);

router.get("/:username/:password", controller.getByUP);

router.delete(
  "/:id",
  authenticateToken,
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
