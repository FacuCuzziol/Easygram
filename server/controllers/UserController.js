const mongoose = require('mongoose');
const User = mongoose.model('User')
const Post = mongoose.model('Post')
exports.getUser = (req,res,next)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
}

exports.follow = (req,res,next)=>{
    console.log(req)
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{new:true}).select("-password").then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    })
}

exports.unfollow = (req,res,next)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{new:true}).select("-password").then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    })
}


exports.updatepic = (req,res,next)=>{
    User.findByIdAndUpdate(req.user._id,{
        $set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
            if(err){
                return res.status(422).json({error:"Pic cannot be posted"})
            }
            res.json(result)
        
    })
}


exports.searchUsers = (req,res,next)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("_id email name")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })
}