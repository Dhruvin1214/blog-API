var mongoose = require('mongoose');
var categoryschema= new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    }
})

module.exports = mongoose.model('category',categoryschema);