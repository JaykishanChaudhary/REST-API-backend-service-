const router=require('express').Router();
const authMiddleware=require('../AuthMiddleware/authMiddleware');
const postModel=require('../model/post');


router.post('/posts', authMiddleware,async(req,res)=>{
    try{
        const { title, body, image, user }=req.body;
        const newPost=await postModel.create({
            title,
            body,
            image,
            user
        })
        res.json({
            status:'Successfully created new post',
            result:newPost
        })

    }catch(err)
    {
        console.log(err);
    }

})

router.get('/posts',authMiddleware,async(req,res)=>{
    try{
        const GetPost=await postModel.find({});
        console.log(GetPost);
        res.json({
            status:"Got the data",
            result:GetPost
        })
    }catch(error)
    {
        throw error
    }
    
})

router.get('/posts/:postId',async(req,res)=>{
    try{
        const {postId}=req.params;
        const _id=postId;
        const IdFound=await postModel.find({_id});
        if(IdFound)
        {
            const GetPostByID=await postModel.findOne({_id});
            res.json({
                status:"Found the data",
                result:GetPostByID
            })
        }
        else{
            res.json({
                status:"ID does not match"
            })
        }
    }catch(error)
    {
        throw error
    }
})

router.put('/posts/:postId',authMiddleware,async(req,res)=>{
    try{
        const {postId}=req.params;
        const _id=postId;
        const IdFound=await postModel.findOne({_id});
        console.log(IdFound);
        if(IdFound)
        {
            const UpdatePost=await postModel.updateOne(IdFound,req.body);
            res.json({
                status:'Updated the data',
                result:UpdatePost
            })
        }
        else{
            res.json({
                status:"This id does not exist"
            })
        }
    }catch(error)
    {
        throw error
    }
    
})

router.delete('/posts/:postId',authMiddleware,async(req,res)=>{
    try{
        const {postId}=req.params;
        const _id=postId;
        console.log(_id);
        const idFound=await postModel.find({_id});
        console.log(idFound);
        if(idFound)
        {
            await postModel.deleteOne({_id});
            res.json({
                status:"Deleted successfully"
            })
        }
        else{
            res.json({
                status:"This id does not found"
            })
        }
    }catch(error)
    {
        throw error
    }
})

module.exports=router