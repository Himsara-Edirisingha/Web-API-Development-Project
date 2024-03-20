const express = require("express");
const bodyParser = require("body-parser");
// const { PERMISSION } = require("../../service/enums/enums");
// const {
//   authPermission,
// } = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/user-controller");

const router = express.Router();
router.use(bodyParser.json());

router.get("/", controller.get);

router.post("/", controller.create);

router.get("/:username/:password",  controller.getByUP);

router.delete("/:id", controller.remove);

router.put("/:id", controller.update);

module.exports = router;