import mongoose from "mongoose"

const CommunitySchema=new mongoose.Schema({
    id:{type:String,required:true},
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    image:String,
    bio:String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    threads:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"ThreadForm"
        }
    ],
    members:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'User'}
    ],
    onboarded:{
        type:Boolean,
        default:false
    },
    communities:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Community"
    }

})

const Community= mongoose.models.Community ||mongoose.model("Community",CommunitySchema);
export default Community;

