import nodemailer from 'nodemailer';
import User from "../models/userModels";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        console.log("user",userId);
        
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        console.log("🚀 ~ file: mailer.ts:10 ~ sendEmail ~ hashedToken:", hashedToken)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "58620def2fbeca",
              pass: "4bf19702b17506"
            }
          });

            const DOMAIN = "http://localhost:3000"
        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${DOMAIN}/verifyEmail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}