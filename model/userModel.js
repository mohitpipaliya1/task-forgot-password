const mongoose = require('mongoose')
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


var userSchema = new mongoose.Schema({

   name: {type: String},
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true, trim: true },
    contactNumber: { type: String },
    address: { type: String },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET,{expiresIn: '30m'})
    
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    console.log(email);
    const user = await userModel.findOne({ email })
    console.log(user);
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
    
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})




const userModel = new mongoose.model('Demo', userSchema);

module.exports = {userModel};