var express = require('express');
var router = express.Router();
const userController = require('../Controllers/userController')

router.get("/", userController.get);
router.post('/', userController.post);
router.get('/fetchuser/:id', userController.fetchUserById);
router.delete("/deleteuser/:id", userController.deleteByUserId);
router.get("/getSingle",userController.getSingleUser);

module.exports = router;
