import connect from "../../../../dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "../../../../models/userModels";

connect();

export async function POST(request: NextRequest) {
    console.log("in thia backend");
    const reqBody:any = request.body;
        console.log("🚀 ~ file: route.ts:11 ~ POST ~ reqBody:", reqBody)
        const {token} = reqBody;
        console.log("🚀 ~ file: route.ts:12 ~ POST ~ token:", token)
    return
    try {
        
        const reqBody = await request.json();
        console.log("🚀 ~ file: route.ts:11 ~ POST ~ reqBody:", reqBody)
        const {token} = reqBody;
        console.log("🚀 ~ file: route.ts:13 ~ POST ~ token:", token)
        
        const user = await User.findOne({verifyToken: token},{verifyTokenExpiry: {$gt: Date.now()}});
    

        if (!user) {
            return NextResponse.json({error: "Invalid token"},{status: 400})
        }

        user.isVerified = true;
        user.verifyTokenExpiry = undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
        

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

