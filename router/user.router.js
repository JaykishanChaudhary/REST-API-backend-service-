const router=require('express').Router();
const UserModel=require('../model/user');
const jwt=require('jsonwebtoken');
const userModel = require('../model/user');
const bcrypt=require('bcrypt');

function handleError(err)
{
   console.log(err.message,err.code); 
   let errors={name:"",email:"",password:""};

   if(err.code===11000)
   {
    errors.email="That email already registered"
    return errors
   }

   if(err.message.includes('user validation failed'))
   {
       Object.values(err.errors).forEach(({properties})=>{
        errors[properties.path]=properties.message;
       })
   }
   return errors
}


const createToken=(id)=>{
    return jwt.sign({id},'secret-key')
}

router.post('/register',async(req,res)=>{
   try{
    const {name,email,password}=req.body;
    console.log(name,email,password);
   
        const NewUser=await UserModel.create({
            name,
            email,
            password
        })
       
        res.json({
            status:'Created the new user',
            result:NewUser,
            id:NewUser._id
        })
    }catch(error)
   {
    const errors=handleError(error);
    res.json({
        errors
    })
   }
})



router.post('/login',async(req,res)=>{
    try{
        const {name,email,password}=req.body;
    const user=await userModel.findOne({email});
    console.log(name,email,password,user);
    if(user)
    {
        const passwordAuth=await bcrypt.compare(password,user.password);
        if(passwordAuth)
        {
            const token=createToken(user._id);
            res.json({success:true,token:token})
        }
        else{
            res.json({
                status:'Password does not match'
            })
        }
    }
    }catch(err)
    {
        throw err
    }
    
})

module.exports=router;