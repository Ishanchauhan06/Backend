import {asyncHandler} from "../utils/asynshandler.js"
import {ApiError} from "../utils/Apierrors.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const resgisterUser = asyncHandler(async (req, res)=>{
   
    const { fullname, email, username, password }=req.body
    console.log("Email:", email);
    if([fullname, email, username, password].some((field)=>
     field?.trim()==="")
     ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [ {username}, {email} ]
    })
    if(existedUser){
        throw new ApiError(409, "User Already Exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const imageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(imageLocalPath);
    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser =await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something Went Wrong While registering")
    }

    return res.status(201).json(
       new ApiResponse(200, createdUser, "User Created Successfully" )
    )

})
// name // email get user details from frontend
// validation - not empty
// check if user not exists :username, email
// check for images and avatar and
// upload them in cloudinary, avatar
//create user object - create entry in db
//remove password and refresh token field from response
//check for user creation 
//return response



export {resgisterUser} 