const uuid = require('uuid');

let postDB = [
    {
        id: uuid.v4(),
        title: "First Post",
        content: "This is my first post",
        author: "Carolina",
        publishDate: '23-Mar-19'
    },
    {
        id: uuid.v4(),
        title: "Second Post",
        content: "This is my second post",
        author: "Carolina",
        publishDate: '23-Mar-19'
    },
    {
        id: uuid.v4(),
        title: "Third Post",
        content: "This is my third post",
        author: "Ana",
        publishDate: '23-Mar-19'
    }
];

const ListPosts = {
    get : function(){
        return postDB;
    },
    
    getAuthor : function(author){
        const authorPosts = [];
        
        postDB.forEach(item => {
            if(author == item.author){
                authorPosts.push(item);
            }
        });
        return authorPosts;
    },

    postNew : function(postTitle, postContent, postAuthor, postPublishDate){
        let newPost = {
            id: uuid.v4(),
            title: postTitle,
            content: postContent,
            author: postAuthor,
            publishDate: postPublishDate
        };
        postDB.push(newPost);
        return newPost;
    },

    delete : function(postId){
        let post = null
        postDB.forEach((item, index) => {
            if(postId == item.id){
                post = postDB[index];
                delete postDB[index];
            }
        });
        return post;
    },

    put : function(postId, postTitle, postcontent, postAuthor, postDate){
        let post = null;
        postDB.forEach(item => {
            if(postId == item.id){
                if(postTitle) {item.title = postTitle;}
                if(postcontent) {item.content = postcontent;}
                if(postAuthor) {item.author = postAuthor;}
                if(postDate) {item.publishDate = postDate;}
                post = item;
            }
        });
        return post;   
    }
};

module.exports = {ListPosts}