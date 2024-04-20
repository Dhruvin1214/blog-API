var express = require('express');
var router = express.Router();
var bloggercontroller=require('../controller/bloggercontroller');


//BLOGGER LOGIN
router.post('/login',bloggercontroller.login);
router.get('/logout',bloggercontroller.logout);


//ADD BLOG
router.post('/add_blog',bloggercontroller.add_blog);

//VIEW BLOG
router.get('/view_blog',bloggercontroller.view_blog);

//UPDATE BLOG
router.post('/update_blog/:id',bloggercontroller.update_blog);

//DELETE BLOG
router.get('/delete_blog/:id',bloggercontroller.delete_blog);


module.exports = router;