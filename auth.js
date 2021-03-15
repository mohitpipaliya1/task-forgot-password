const jwt = require('jsonwebtoken')
const {User} = require('./model/userModel')


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token);
        const decoded = jwt.verify(token,'thisismynewtask')
        console.log("hiiii",decoded);
        const user = await User.findById({_id:decoded._id})
        console.log(user);
        if (!user) {
            throw new Error()
        }
        console.log(user);
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth