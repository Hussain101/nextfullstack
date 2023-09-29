"use client"

import React,{useReducer, useState} from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {useRouter} from "next/navigation";

const page = () => {
  const router = useRouter()
  const [formData,setformData] = useState({
    
    email:"",
    password:""
  });
  const [disable,setdisable] = useState(true);
  const onLogin= async () =>{
    try {
      const resposes = await axios.post("./api/users/login",formData);
      console.log(resposes,"response");
     localStorage.setItem("token",resposes?.data);
     toast.success("Login succesfully ");
     router.push("/profile")
    } catch (error) {
      toast.error("fill all fields")
    }
  }
  return (
    <div className='bg-black flex flex-col h-screen w-full justify-center items-center'>
      <Toaster />
      <div className='flex flex-col'>
        
        <label htmlFor="email" className='text-lg text-white  font-semibold'>Email</label>
        <input type="text" id="email" value={formData.email} 
        onChange={(e) =>{
            setformData({
              ...formData,
              email:e.target.value
            }) 
        }}
        className='p-2 rounded-lg focus:outline-none'
        />
        <label htmlFor="password" className='text-lg text-white  font-semibold'>Password</label>
        <input type="password" id="password" value={formData.password} 
        
        className='p-2 rounded-lg focus:outline-none'
        />
        <button 
        onClick={onLogin}
        className='p-2 text-lg font-semibold text-white'>
          login
        </button>
      </div>
    </div>
  )
}

export default page