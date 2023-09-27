import connect from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST (request: NextRequest) {
   try {
    const reqBody = await request.json();
    const {email,password} = reqBody;
    const user = await User.findOne({email});

    if (!user) {
        return NextResponse.json({error: "User does not find"},{status:400})
    }

    //valide user
    const validUser = await bcryptjs.compare(password, user.password);
    if(!validUser){
        return NextResponse.json({error:"No such user exist"}, {status:501});
    }

    //token data
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }
    const SECRET = "HUSSAINAHMEDSIDDIQUI"
    const token = await jwt.sign(tokenData,SECRET,{expiresIn: "1d"});

    
    const response = NextResponse.json({
        message:"Login successfully",
        success: true,
    })
    response.cookies.set("token",token,{
        httpOnly :true ,
    });

    return response;


   } catch (error:any) {
    return NextResponse.json({error:error.message}, {status:500})
    
   }

}