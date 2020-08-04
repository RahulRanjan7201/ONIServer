const Post = require('../models/post') 

exports.savePost = async (mediaPath, email,message,createdAt) => {
    const post = new Post({
        mediaPath:mediaPath,
        userEmail:email,
        message:message,
        createdAt:new Date()
    });
    await post.save()
}
exports.loadPosts = async () => {
    // TODO:Lazing loading 
    return await Post.find({}).lean();
}