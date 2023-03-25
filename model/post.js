const mongoose=require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// title, body, image, user 

const postSchema=new mongoose.Schema({
   title:{type:String,
        required:[true,'Please add title']
        },
        body:{
            type:String,
            required:[true,'Please add body']
        },
        image:{
            data:Buffer,
            contentType:String,
            // required:[true,'Please add image']
        },
        user:{
            type:Number
        }

})

// postSchema.plugin(autoIncrement.plugin,{
//     model:'post',
//     field:'user',
//     startAt:1,
//     increamentBy:1,
//     type:'string',
//     unique:true,
//     required:true
// })

const postModel=mongoose.model('post',postSchema)

module.exports=postModel 