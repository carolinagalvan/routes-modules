const express = require('express');
const router = express.Router();
const {ListPosts} = require('./blog-post-model');

// GET all posts
router.get('/blog-posts', (req, res, next) => {
    let infoOfAllPosts = ListPosts.get();

    if(infoOfAllPosts){
        res.status(200).json({
            message: "Successfully sent the list of posts",
            status: 200,
            posts: infoOfAllPosts
        });
    }
    else{
        res.status(500).json({
            message: "Internal server error.",
            status: 500
        });
        next();
    }

});

//Post by author
router.get('/blog-posts/:author', (req, res, next) =>{
    let postAuthor = req.params.author;

    if(!postAuthor){
        res.status(406).json({
            message: "Missing author field in params",
            status: 406
        });
    }

    let infoOfAllPosts = ListPosts.getAuthor(postAuthor);

    if(infoOfAllPosts.length > 0){
        res.status(200).json({
            message: "Successfully sent the list of posts",
            status: 200,
            post: infoOfAllPosts
        });
    }
    else{
        res.status(404).json({
            message : "Author posts not found in the list",
            status : 404
        });
        next();
    }   

});


//POST requests of a blog post should go to /blog-posts
router.post('/blog-posts', (req, res, next) => {

    let postTitle = req.body.title;
    let postContent = req.body.content;
    let postAuthor = req.body.author;
    let postPublishDate = req.body.publishDate;

    let requiredFields = ['title', 'content', 'author', 'publishDate'];

    for (let i = 0; i < requiredFields.length; i++){
        let currentField = requiredFields[i];
        if(!(currentField in req.body)){
            res.status(406).json({
                message : `Missing field ${currentField} in body.`,
                status : 406
            });
            return next();
        }
    }

    let newPost = ListPosts.postNew(postTitle, postContent, postAuthor, postPublishDate);

    res.status(201).json({
        message: "Successfully added the post",
        status: 201,
        post: newPost
    });

});


//DELETE requests should go to /blog-posts/:id
router.delete('/blog-posts/:id', (req, res, next) => {
    let bodyId = req.body.id;
    let paramId = req.params.id;

    if(!bodyId || !paramId || bodyId != paramId){
        res.status(406).json({
            message: "Missing id field in body or paramters or id's don't match",
            status: 406
        });
        return next();
    }
   
    if(ListPosts.delete(paramId)){
        res.status(200).json({
            message: "Successfully deleted the post",
            status: 200
        });
    }
    else{
        res.status(404).json({
            message : "Post not found",
            status : 404
        });
        next();
    }   

});


//PUT requests should go to /blog-posts/:id
router.put('/blog-posts/:id', (req, res) => {
    let postId = req.params.id;
    let updatedPost = req.body;
    
    if(!postId){
        res.status(406).json({
            message: "Missing id field in params",
            status: 406
        });
    }

    if(!updatedPost.title && !updatedPost.content && !updatedPost.author && !updatedPost.publishDate){
        res.status(404).json({
            message: "No data in body",
            status: 404
        });
    }
    
    let newPost = ListPosts.put(postId, updatedPost.title, updatedPost.content, updatedPost.author, updatedPost.publishDate);
    if(newPost){
        res.status(200).json({
            message: "Successfully updated post",
            status: 200,
            post: newPost
        });  
    }
    else{
        res.status(404).json({
            message: 'ID does not exist',
            status: 404,
        });
        next();
    }

});


module.exports = router;

