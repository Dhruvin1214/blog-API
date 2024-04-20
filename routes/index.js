var express = require('express');
var router = express.Router();
var admincontroller = require('../controller/admincontroller')

//ADMIN
router.post('/',admincontroller.admin_create);
router.get('/',admincontroller.view_admin);
router.post('/login',admincontroller.login);
router.get('/logout',admincontroller.logout);

//BLOG
router.post('/add_blog',admincontroller.add_blog);
router.get('/view_blog',admincontroller.view_blog);
router.post('/update_blog/:id',admincontroller.update_blog);
router.get('/delete_blog/:id',admincontroller.delete_blog);

//CATEGORY
router.post('/add_category',admincontroller.add_category);
router.get('/view_category',admincontroller.view_category);
router.post('/update_category/:id',admincontroller.update_category);
router.get('/delete_category/:id',admincontroller.delete_category);

//BLOGGER
router.post('/add_blogger',admincontroller.add_blogger);
router.get('/view_blogger',admincontroller.view_blogger);
router.get('/delete_blogger/:id',admincontroller.delete_blogger);

module.exports = router;