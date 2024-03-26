const express = require('express');
const bodyParser = require("body-parser");
const { PERMISSION , USER_TYPES } = require("../../service/enums/enums");
const {
  authPermission,authUserType,authenticateToken
} = require("../../service/controllers/middleware/auth-controller");

const controller = require("../../service/controllers/metrics-data-controller");


const router = express.Router();
router.use(bodyParser.json());

router.get("/", controller.get);



router.post("/",authenticateToken,authUserType([USER_TYPES.DATAWRITER]),authPermission(PERMISSION.WRITE), controller.create);

router.get("/:id", controller.getbyid);

router.delete("/:id", controller.remove);

router.put("/:id", controller.update);

module.exports = router;
