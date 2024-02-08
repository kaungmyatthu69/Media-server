const mongoose = require('mongoose');
const {Schema} = mongoose;
let categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    create:{
        type:Date,
        default:Date.now
    }
})

const Category = mongoose.model('category', categorySchema);
module.exports = Category;