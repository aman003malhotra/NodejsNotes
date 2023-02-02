const { validationResult } = require('express-validator');

const Post = require('../models/post')

exports.getPosts = (req,res,next) => {
    Post.find()
    .then(posts => {
        res.status(200).json({message:"Posts fetched successfully", posts:posts})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next()
    })
}

exports.postPost = (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()){
        const error = new Error('validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }
    if(!req.file) {
        const error = new Error('No image is provided');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path.replace(/\\/g, "/");
    const post = new Post({
        title:title, 
        content:content,
        imageUrl:imageUrl,
        creator :{ name: "Aman" },
    })
    post.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:'Post created successfully',
            post:result
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next();
    })
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Could Not find any post')
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'Post fetched', post:post})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next();
    })
}