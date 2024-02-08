const mongoose = require('mongoose');
const {Schema} = mongoose;
let postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    tag:{
        type:Schema.Types.ObjectId,
        ref:'tag',
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    like:{
        type:Number,
        default:0
    },
    image:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    create:{
        type:Date,
        default:Date.now
    }
})

const Post = mongoose.model('post', postSchema);
module.exports = Post;