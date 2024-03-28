const express = require("express");
const bodyParser = require("body-parser");
const { PERMISSION, USER_TYPES } = require("../../service/enums/enums");
const {
  authenticateToken,

} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/user-controller");

const router = express.Router();
router.use(bodyParser.json());

router.get(
  "/",
  authenticateToken,
 
  controller.get
);

router.post("/", controller.create);

router.get("/:username/:password", controller.getByUP);

router.delete(
  "/:id",
  authenticateToken,
  
  controller.remove
);

router.put(
  "/:id",
  authenticateToken,
  
  controller.update
);

module.exports = router;
