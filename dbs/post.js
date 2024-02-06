const mongoose = require('mongoose');
const {Schema} = mongoose;
let postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
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