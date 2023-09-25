import connect from "../../../../dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../../../models/userModels";


connect();

export  async function POST(request: NextRequest) {
    console.log(request,"this is request");
    try {
        const reqBody = await request.json();
        console.log(" POST ~ reqBody:", reqBody)
        const {username,email,password} = reqBody;

        const userfind = await User.findOne({email});
        console.log(" POST ~ userfind:", userfind)

        if (userfind) {
            return NextResponse.json({error: "User alreadu exist"}, {status:400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username : username ,
            email: email,
            password: hashpassword
        });
        

        const savedUser = await newUser.save()
        console.log(" POST ~ savedUser:", savedUser)
        return NextResponse.json({

            message:"successfully registered",
            success: true,
            
        })
    } catch (error) {
        
    }
    
}

