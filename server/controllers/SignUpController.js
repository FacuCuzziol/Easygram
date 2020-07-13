const mongoose = require('mongoose')

const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
exports.signup = (req,res,next)=>{
    console.log(req.body.name);
    const {name,email,password,pic} = req.body
    if(!email || !name || !password){
        return res.status(422).json({error:"Please add all the required fields"});
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"});
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
            user.save()
            .then(user =>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })   
    })
    .catch(err=>{
        console.log(err);
    })
    
};

