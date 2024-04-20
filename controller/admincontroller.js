var adminmodel=require('../model/adminmodel');
var blogmodel=require('../model/blogmodel');
var categorymodel=require('../model/categoriesmodel');
var bloggermodel=require('../model/bloggermodel');
var bcrypt=require('bcrypt')
const storage = require('node-persist');
storage.init( /* options ... */ );

// ========================================
//                ADMIN
// ========================================

//ADMIN LOGIN
exports.admin_create = async (req,res) =>{
    var b_pass= await bcrypt.hash(req.body.password,10);
    req.body.password = b_pass;

    var data= await adminmodel.create(req.body);
    res.status(200).json({
        status:'created',
        data
    })
}

//VIEW ADMIN EMAIL AND PASSWORD
exports.view_admin = async (req,res) =>{
    var data=await adminmodel.find(req.body);
    res.status(200).json({
        data
    })
}

//ADMIN LOGIN STATUS
exports.login = async (req,res) =>{
    var data=await adminmodel.find({"email":req.body.email});
    var login_status = await storage.getItem('admin_id');

    if(login_status == undefined){
        if(data.length==1){
            await storage.setItem('admin_id',data[0].id);
            bcrypt.compare(req.body.password,data[0].password, function(err, result){
                if(result==true){
                    res.status(200).json({
                        status:"Admin Login Success"
                    })
                }
                else{
                    res.status(200).json({
                        status:"Check email and password"
                    })
                }
            });
        }
        else{
            res.status(200).json({
                status:"Check email and password"
            })
        }
    }
    else{
        res.status(200).json({
            status:'Admin is already logged in..!'
        })
    }
}

exports.logout = async (req,res) =>{
    storage.clear();
    res.status(200).json({
        status:"Logged Out"
    })
}


// ========================================
//                BLOG
// ========================================

//ADD BLOG
exports.add_blog = async (req,res) =>{
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined){
        var data= await blogmodel.create(req.body);
        res.status(200).json({
            status:'Blog Added'
        })
    }
    else{
        res.status(200).json({
            status:'your are not login please login first...!'
        })
    }
}

//VIEW BLOG
exports.view_blog = async (req,res) =>{
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined){
        var data= await blogmodel.find(req.body);
        res.status(200).json({
            data
        })
    }
    else{
        res.status(200).json({
            status:'your are not login please login first...!'
        })
    }
}

//UPDATE BLOG
exports.update_blog = async (req,res) =>{
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined){
        var id=req.params.id;
        var data= await blogmodel.findByIdAndUpdate(id,req.body);

        res.status(200).json({
            status:"Blog Update"
        })
    }
    else{
        res.status(200).json({
            status:"Your are not login please login first"
        })
    }
}

//DELETE BLOG
exports.delete_blog = async (req,res) =>{
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined){
        var id=req.params.id;
        var data= await blogmodel.findByIdAndDelete(id);

        res.status(200).json({
            status:"Blog Deleted"
        })
    }
    else{
        res.status(200).json({
            status:"Your are not login please login first"
        })
    }
}

// ========================================
//              CATEGORY
// ========================================

//ADD CATEGORY
exports.add_category = async (req,res) =>{
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined){
        var data= await categorymodel.create(req.body);
        res.status(200).json({
            status:"Category Added"
        })
    }
    else{
        res.status(200).json({
            status:'your are not login please login first...!'
        })
    }
}

//VIEW CATEGORY
exports.view_category = async (req,res) =>{
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined){
        var data=await categorymodel.find(req.body);
        res.status(200).json({
            data
        })
    }
    else{
        res.status(200).json({
            status:'your are not login please login first...!'
        })
    }
}

//UPDATE CATEGORY
exports.update_category = async (req,res) =>{
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined){
        var id=req.params.id;
        var data=await categorymodel.findByIdAndUpdate(id,req.body);

        res.status(200).json({
            status:"Category Update"
        })
    }
    else{
        res.status(200).json({
            status:"Your are not login please login first"
        })
    }
}

//DELETE CATEGORY
exports.delete_category = async (req,res) =>{
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined){
        var id=req.params.id;
        var data=await categorymodel.findByIdAndDelete(id);

        res.status(200).json({
            status:"Category Delete"
        })
    }
    else{
        res.status(200).json({
            status:"you are not login please login first"
        })
    }
}


// ========================================
//               BLOGGER
// ========================================
//ADD BLOGGER
exports.add_blogger = async (req, res) =>{
    var login_status = await storage.getItem('admin_id');

    var b_pass= await bcrypt.hash(req.body.password,10);
    req.body.password = b_pass;
    
    if(login_status  != undefined){
        var data=await bloggermodel.create(req.body);
        res.status(200).json({
            status:"blogger added",
        })
    }
    else{
        res.status(200).json({
            status:"admin is not login"
        })
    }
}

//VIEW BLOGGER
exports.view_blogger = async (req, res) =>{
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined){
        var data= await bloggermodel.find();
        res.status(200).json({
            data
        });
    }
    else{
        res.status(200).json({
            status:'admin is not login'
        })
    }
}

//DELETE BLOGGER
exports.delete_blogger= async(req,res) =>{
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined){
        var id=req.params.id;
        var data=await bloggermodel.findByIdAndDelete(id);

        res.status(200).json({
            status:'Blogger Deleted'
        })
    }
    else{
        res.status(200).json({
            status:'Admin is not login'
        })
    }
}




