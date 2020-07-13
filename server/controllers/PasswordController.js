const mongoose = require('mongoose')

const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const {GRID_KEY,SENDER_EMAIL} = require('../keys');
const ctypto = require('crypto');


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:GRID_KEY
    }
}))


exports.resetPassword = (req,res,next)=>{
    ctypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User don't exist with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now()+ 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:SENDER_EMAIL,
                    subject:"Password reset",
                    html:`
                    <p>Thank you for requesting a password reset</p>
                    <h5>Click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password</h5>
                    `
                })
                res.json({message:"Please check your email for instructions"})
            })
        })
    })
}

exports.newPassword = (req,res,next)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again. Session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
            user.password = hashedpassword
            user.resetToken = undefined
            user.expireToken = undefined
            user.save().then((saveduser)=>{
                res.json({message:"Password updated successfully"})
            })
        })
    }).catch(err=>{
        console.log(err)
    })


}