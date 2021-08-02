const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

exports.signUp = async (req, res) => {
    const {username, password} = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username,
            password: hashPassword
        })
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'failed'
        })    
    }
}

exports.login = async(req,res) => {
    const {username, password} = req.body
    try {
        const user = await User.findOne({username})
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        } else {
            
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if (isCorrect) {
            res.status(200).json({
                status: 'youre logged in'
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'incorrect username or password'
            })
        }
    } catch (e) {
        res.status(400).json({
            status: 'failed'
        })    
    }
}