const  mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        lowecase:true,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        validate(value){
           if(!["male","female","others"].includes(value)){
            throw new Error("Gender is not valid");
           } 
        }
    },
    photoURL:{
        type:String,
        default: "https://i.pinimg.com/736x/d5/92/7c/d5927c2014c81c9be05de53ae60dedf2.jpg"
    },
    bio:{
        type:String,
        default:"learner",
    },
    skills:{
        type:[String],
        default: ["c++","java"]
    },
},
{ timestamps: true },
);









const User = mongoose.model("User",userSchema);

module.exports = User;