const mongoose = require('mongoose');
const {Schema} = mongoose;
let commentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
   postId:{
     type:Schema.Types.ObjectId,
        required:true
   },
    content:{
        type:String,
        required:true
    },
    create:{
        type:Date,
        default:Date.now
    }
})

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;