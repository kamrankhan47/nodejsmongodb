const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://kamran47:0503773575Kamran@cluster0.8cv3hap.mongodb.net/', { useNewUrlParser: true }).then(
    () => {
        console.log('Database is connected');
    }
)

app.get('/', (req, res) => {
    res.send('Hello World');
})
 
 const postSchema=  mongoose.Schema({ 
        title: String,
        body: String,
        id: Number,
        likeCount: Number,
 })  
 const Post = mongoose.model('Post', postSchema);

 app.use(express.json());


app.get('/api/posts', (req, res) => {
     Post.find().then((posts) => {
            res.json(posts)
     }).catch((err) => {
            res.json(err)
     })
})

app.post('/api/posts', (req, res) => {
    let post = new Post({
        title: req.body.title,
        body: req.body.body,
        likeCount: req.body.likeCount
    })
    post.save().then((post) => {
        res.json(post)
    })
})

app.put('/api/posts/:id', (req, res) => {
    Post.findOneAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        body: req.body.body,
        likeCount: req.body.likeCount
    }).then((post) => {
        res.json(post)
    }).catch((err) => {
        res.json(err).status(404)
    })
})

app.delete('/api/posts/:id', (req, res) => {
    Post.findOneAndDelete({_id: req.params.id}).then((post) => {
        res.json(post)
    }).catch((err) => {
        res.json(err).status(404)
    })
})
    

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})