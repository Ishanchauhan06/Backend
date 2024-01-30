import { Router } from "express";
import { logOutUser, loginUser, resgisterUser, refreshAccessToken } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middlewear.js"
import { verifyJWT } from "../middlewares/auth.middlewear.js";

const router = Router()

router.route("/register").post(
    upload.fields([
       {
        name: "avatar",
        maxCount: 1
       },
       {
        name: "coverImage",
        maxCount: 1
       }
    ]),
    resgisterUser)
router.route("/login").post(loginUser)

//secured routes 
router.route("/logout").post(verifyJWT, logOutUser)
router.route("/refresh-token").post( refreshAccessToken)
export default router