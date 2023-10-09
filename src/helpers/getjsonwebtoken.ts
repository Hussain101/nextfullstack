import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getjsonwebtoken  = (request: NextRequest) =>{
    try {
        const SECRET = "HUSSAINAHMEDSIDDIQUI";
        const token = request.cookies.get("token")?.value || "";
        const decodeToken:any = jwt.verify(token,SECRET);
        return decodeToken.id;
    } catch (error) {
        throw new Error(error.message);
        
    }
}