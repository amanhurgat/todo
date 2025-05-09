const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
});

const User=mongoose.model('User',userSchema);
module.exports=User;