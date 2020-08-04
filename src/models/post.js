
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = new Schema ({
    userEmail: { type: String, required: true },
    mediaPath: { type: String },
    message: { type: String ,required: true},
    createdAt: {type:Date}
});

module.exports = mongoose.model('Post', Post,'post')