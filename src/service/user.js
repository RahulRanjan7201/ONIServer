const User = require('../models/user') 

exports.verifyUser = async (email, password) => {
    const data = await User.findOne({email:email, password:password}).lean();
    return data ? true : false;
}