const express=require('express');
const app=express();
const mongoose=require('mongoose');
const UserRouter=require('./router/user.router');
const PostRouter=require('./router/post.router');
// const path=require('path');


mongoose.connect('mongodb://127.0.0.1:27017/assignment',{useNewUrlParser:true},{useUnifiedTopology:true})
.then(()=>{console.log('connected to DB')})
.catch(()=>{console.log('error occerred during connecting to DB')});

app.use(express.json());
app.use('/',UserRouter);
app.use('/',PostRouter);
app.set('view engine','ejs'),
// app.set('views',path.join(_dirname,'views'));
app.get('/signup',(req,res)=>{
    res.render('signup');
})

app.listen(3000,()=>{
    console.log("server is running on 3000");
})