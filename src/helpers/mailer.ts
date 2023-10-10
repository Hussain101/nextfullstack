import nodemailer from "nodemailer";
import User from "../models/userModels";
import bcryptjs from "bcryptjs";

export async function sendEmail({ email, emailType,userId }:any) {
    try {
        //first we will create hashed token to check 

        const hashedtoken = await bcryptjs.hash(userId.toString(),10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,{
                verifyToken : hashedtoken,
                verifyTokenExpiry: Date.now() + 36000
            })
        } else if(emailType === "RESET")
        {
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedtoken,
                forgotPasswordTokenExpiry: Date.now()+36000
            })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "58620def2fbeca",
              pass: "4bf19702b17506"
            }
          });
          const mailOPtions ={
            from: "hussainsidd99@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email ":"Reset your password",
            html: `<p>Click <a href="http://localhost:3001/verifyemail?token=${hashedtoken}">Here</a> to ${emailType==="VERIFY"? "Verify your email":"reset your password"}`

          }
          const mailresponse = await transport.sendMail(mailOPtions);
          return mailresponse
    } catch (error) {
        
    }
}
