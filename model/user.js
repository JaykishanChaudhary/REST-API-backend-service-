const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const {isEmail}=require('validator');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter the name']
    },
    email:{
        type:String,
        required:[true,'Please enter the email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter the password'],
        minLength:[6,'Minimum password length is 6 characters']
    }
})

userSchema.pre('save',async function(next){
    console.log('User is about to created and saved',this);
    const salt= await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt); 
    next();
})




const userModel=mongoose.model('user',userSchema);

module.exports=userModel