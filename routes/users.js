var express = require('express');
var router = express.Router();
var usercontroller=require('../controller/usercontroller')

router.get('/view_blog',usercontroller.view_blog);

module.exports = router;
