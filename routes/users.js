var express = require('express');
const userController = require('../controller/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/email',userController.email)
router.get('/worker',userController.worker)
module.exports = router;
