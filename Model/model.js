const mongoose=require ("mongoose");
const userSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    post:{
        type:String,
        required:true,
    },

});
module.exports=mongoose.model("Post",userSchema)
