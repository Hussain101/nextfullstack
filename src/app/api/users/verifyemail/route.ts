import connect from "../../../../dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "../../../../models/userModels";

connect();

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json();
        console.log("🚀 ~ file: route.ts:11 ~ POST ~ reqBody:", reqBody)
        const {token} = reqBody;
        console.log("🚀 ~ file: route.ts:13 ~ POST ~ token:", token)
        
        const user = await User.findOne({verifyToken: token},{verifyTokenExpiry: {$gt: Date.now()}});
        console.log('🚀 ~ file: route.ts:20 ~ POST ~ user:', JSON.stringify(user))

        if (!user) {
            return NextResponse.json({error: "Invalid token"},{status: 400})
        }
        

    } catch (error) {
        
    }
}

