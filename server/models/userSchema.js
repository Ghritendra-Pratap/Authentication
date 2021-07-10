const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },

    email: {
        type: String,
        required:true
    },

    phone: {
        type: Number,
        required:true
    },

    password: {
        type: String,
        required:true
    },

    cpassword: {
        type: String,
        required:true
    }
        
});

//hasing the password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.cpassword = await bcrypt.hash(this.cpassword, salt);
    }
    next();
});

const User = mongoose.model('USER', userSchema);
module.exports = User;
