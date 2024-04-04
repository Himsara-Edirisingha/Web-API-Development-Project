const express = require("express");
const bodyParser = require("body-parser");
const { PERMISSION, USER_TYPES } = require("../../service/enums/enums");
const {
  authenticateToken,
  authPermission,
  authUserType,
} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/user-controller");
const authcontroller = require("../../service/controllers/token-controller");

const router = express.Router();
router.use(bodyParser.json());

router.get(
  "/",
  authenticateToken,
  authPermission(PERMISSION.READ),
  authUserType([USER_TYPES.ADMIN, USER_TYPES.REGISTERED]),
  controller.getUsers
);

router.post("/", controller.createUser);

router.post("/auth", authcontroller.authUser);

router.get("/:username/:password", controller.getUserByUsernamePassword);

router.delete(
  "/:id",
  authenticateToken,
  authPermission(PERMISSION.DELETE),
  authUserType([USER_TYPES.ADMIN]),
  controller.deleteUser
);

router.put(
  "/:id",
  authenticateToken,
  authPermission(PERMISSION.UPDATE),
  authUserType([USER_TYPES.ADMIN]),
  controller.updateUser
);

module.exports = router;
