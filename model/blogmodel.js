var mongoose = require('mongoose');
var blogschema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    author:{
        type:String
    },
});

module.exports = mongoose.model('blog',blogschema);