const mongoose = require('mongoose');
const {Schema} = mongoose;
let tagSchema = new Schema({
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

const Tag = mongoose.model('tag', tagSchema);
module.exports = Tag;