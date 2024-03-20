const express = require("express");
const bodyParser = require("body-parser");
const { PERMISSION } = require("../../service/enums/enums");
const {
  authPermission,
} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/weather-station-controller");

const router = express.Router();
router.use(bodyParser.json());

router.get("/", authPermission(PERMISSION.READ), controller.get);

router.post("/", authPermission(PERMISSION.WRITE), controller.create);

router.get("/:id", authPermission(PERMISSION.READ), controller.getbyid);

router.delete("/:id", authPermission(PERMISSION.DELETE), controller.remove);

router.put("/:id", authPermission(PERMISSION.UPDATE), controller.update);

module.exports = router;
