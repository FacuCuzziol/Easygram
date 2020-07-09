const mongoose = require('mongoose');
const Post = mongoose.model('Post')

exports.createpost = (req,res,next)=>{
    const {title,body,pic} = req.body
    if(!title || !body || !pic) {
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getallposts = (req,res,next)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts =>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getmypost = (req,res,next) =>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost =>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err);
    })
}