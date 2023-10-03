import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getjsonwebtoken  = (request: NextRequest) =>{
    try {
        const SECRET = "HUSSAINAHMEDSIDDIQUI"
        const token = request.cookies.get("token")?.value || "";
        const decodeToken = jwt.verify(token,SECRET);
        console.log("🚀 ~ file: getjsonwebtoken.ts:10 ~ getjsonwebtoken ~ decodeToken:", decodeToken)
        return decodeToken;
    } catch (error) {
        throw new Error(error.message);
        
    }
}