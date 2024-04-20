var bloggermodel = require('../model/bloggermodel');
var blogmodel = require('../model/blogmodel')
var bcrypt = require('bcrypt');
const storage = require('node-persist');
storage.init( /* options ... */ );

// ========================================
//        BLOGGER LOGIN/LOGOUT
// ========================================
//BLOGGER LOGIN
exports.login = async (req, res) => {
    var blogger_login_status = await storage.getItem('blogger_id');

    var data = await bloggermodel.find({ "email": req.body.email });
    if (blogger_login_status == undefined) {
        if (data.length == 1) {
            await storage.setItem('blogger_id', data[0].id)
            bcrypt.compare(req.body.password, data[0].password, function (err, result) {
                if (result == true) {
                    blogger_login_status = 1;
                    res.status(200).json({
                        status: "Blogger Login Success"
                    })
                }
                else {
                    res.status(200).json({
                        status: "Check email and password"
                    })
                }
            });
        }
        else {
            res.status(200).json({
                status: "Check email and password"
            })
        }
    }
    else {
        res.status(200).json({
            status: "Blogger is already login"
        })
    }
}

//BLOGGER LOGOUT
exports.logout = async (req, res) => {
    storage.clear();
    res.status(200).json({
        status: "blogger logout"
    })
}

//ADD BLOG
exports.add_blog = async (req, res) => {
    var blogger_login_status = await storage.getItem('blogger_id');

    if (blogger_login_status != undefined) {
        var data = await blogmodel.create(req.body);
        res.status(200).json({
            status: 'Blog Added'
        })
    }
    else {
        res.status(200).json({
            status: 'your are not login please login first...!'
        })
    }
}

//VIEW BLOG
exports.view_blog = async (req, res) => {
    var blogger_login_status = await storage.getItem('blogger_id');

    if (blogger_login_status != undefined) {
        var data = await bloggermodel.find({ "email": req.body.email });
        if (data.length == 1) {
            var get_blogs = await blogmodel.find({ "author": data[0].name });
            if(get_blogs.length > 0){
                res.status(200).json({
                    get_blogs
                })
            }
            else{
                res.status(200).json({
                    status:"Blogger not upload any blos yet..!"
                })
            }
        }
    }
    else {
        res.status(200).json({
            status: 'your are not login please login first...!'
        })
    }
}

//UPDATE BLOG
exports.update_blog = async (req, res) => {
    var blogger_login_status = await storage.getItem('blogger_id');

    if (blogger_login_status != undefined) {
        var id = req.params.id;
        var data = await blogmodel.findByIdAndUpdate(id, req.body);

        res.status(200).json({
            status: "Blog Update"
        })
    }
    else {
        res.status(200).json({
            status: "Your are not login please login first"
        })
    }
}

//DELETE BLOG
exports.delete_blog = async (req, res) => {
    var blogger_login_status = await storage.getItem('blogger_id');

    if (blogger_login_status != undefined) {
        var id = req.params.id;
        var data = await blogmodel.findByIdAndDelete(id);

        res.status(200).json({
            status: "Blog Deleted"
        })
    }
    else {
        res.status(200).json({
            status: "Your are not login please login first"
        })
    }
}

