import mongoose from "mongoose";

export default async function connect() {
    try {
        mongoose.connect("mongodb+srv://hussain:hussain123@cluster0.pkgmno6.mongodb.net/");
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("Connected to MongoDB");
        })
        connection.on('error',(errr)=>{
            console.log(errr,"Connected to MongoDB");
        })
    } catch (error) {
        
    }
}