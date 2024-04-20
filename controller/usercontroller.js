var blogmodel=require('../model/blogmodel');

exports.view_blog = async (req,res) =>{
    var data=await blogmodel.find({"__v":"1"});

    if(data.length > 0){
        res.status(200).json({
            data
        })
    }
    else{
        res.status(200).json({
            status:"There is no blog"
        })
    }

}
