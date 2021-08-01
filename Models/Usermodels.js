const mongoose= require("mongoose");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    profilepic:{
        type: String,
        required:true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

userSchema.methods.generateAuthToken= async function(){
  try {
      const token= jwt.sign({_id:this._id}, process.env.KEY);
      this.tokens=this.tokens.concat({token: token})
      await this.save();
      return token
  } catch (error) {
      console.log(error);
  }
}

const User= new mongoose.model("User", userSchema);

module.exports=User;