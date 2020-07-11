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

exports.likePost = (req,res,next) =>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
        },
        {
            new:true
        }).exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                res.json(result)
            }
        })
}

exports.unlikePost = (req,res,next) =>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
        },
        {
            new:true
        }).exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                res.json(result)
            }
        })
}

exports.comment = (req,res,next) =>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
        },
        {
            new:true
        })
        .populate("comments.postedBy","_id name")
        .exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                res.json(result)
            }
        })
}