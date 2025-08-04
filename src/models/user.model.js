
import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userScehma=new Schema({
    
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        index:true //for using searching in large base in database
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,

    },
    fullname:{
        type:String,
        required:true,
        trim: true,
        index: true
    },
    avatar:{
        type:String, 
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref: 'Video',
    },
    password:{
        type:String,
        required:[true, 'Password is required'],

    },
    refreshToken:{
        type:String
    }

},
{
    timestamps:true,
}
)

//we want that before saving passwords i want that it should encrypt
userScehma.pre("save", async function(next) {
    //encrypting the password
    //the problem is that when ever the fields like avatar and all are changed, the password get changed
    //hence we use password hashing with if constion

    if(this.isModified("password"))
    {
        this.password=bcrypt.hash(this.password,10)
        next()
    }
})
//we need to check or validate the encrypted password to be same as databse, as user will write numerical paswword like 1234 but database have it as encrypted password
//so we use custom methods
userScehma.methods.isPasswordCorrect=async function(password)
{
    return await bcrypt.compare(password,this.password)
}

//lets generate access tokens
userScehma.methods.generateAccessToken=function()
{
    //to generate token we use sign
    //jwt.sign({payloads},accessToken,object for expiry and all)
    return jwt.sign(
        {
        //payloads
        _id:this._id,
        email:this.email,
        username: this.username,
        fullName:this.fullname
    },
    //Access token
    process.env.ACCESS_TOKEN_SECRET,
    //object
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
// now refresh token
userScehma.methods.generateRefreshToken=function()
{
    return jwt.sign(
        {
        //payloads - less as compared to access token as it refreshes continuously
        _id:this._id,
        
    },
    //refresh token
    process.env.REFRESH_TOKEN_SECRET,
    //object
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User=mongoose.model("User",userScehma);