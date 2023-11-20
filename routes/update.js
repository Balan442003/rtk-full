var express = require("express");
var router = express.Router();
const updateController = require('../Controllers/updateController')

router.post("/edit", updateController.edit);
router.post("/update", updateController.update);
router.post('/:id', updateController.updateUserById)
router.post("/delete/:id", updateController.deleteUserById);

module.exports = router;
