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
      // const data = resposes.data.stringyfy()
      // console.log("🚀 ~ file: page.tsx:21 ~ onLogin ~ data:", data)
     localStorage.setItem("token",resposes?.data);
     toast.success("Login succesfully ");
     router.push("/profile");
     if (resposes) {
      const userdata = localStorage.setItem("userdata",resposes.data)
      console.log("🚀 ~ file: page.tsx:25 ~ onLogin ~ userdata:", userdata)
     }
    } catch (error) {
      toast.error("fill all fields")
    }
  }
  return (
    <div className='bg-black flex overflow-x-auto flex-col h-screen w-full justify-center items-center'>
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
         onChange={(e) =>{
          setformData({
            ...formData,
            password:e.target.value
          }) 
      }}
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