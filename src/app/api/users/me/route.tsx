import { NextResponse, NextRequest } from "next/server";
import { getjsonwebtoken } from "../../../../helpers/getjsonwebtoken";
import connect from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModels";

connect();

export async function GET(request:NextRequest) {
    try {
        const userId = getjsonwebtoken(request);
    const user = await User.findOne({_id:userId}).select("-password");
    return NextResponse.json({
        message: "User Found",
        data:user
    });
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 400})
    }
}