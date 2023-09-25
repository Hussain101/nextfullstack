"use client"

import React,{useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
const Signup = () => {

  
  const [formData,setformData] = useState({
    username:"",
    email:"",
    password:""
  });
  const onSignUp = async() =>{
    const response = axios.post("/api/users/signup",formData);
    const data = (await response).data;
    console.log("data ui signup ", data);
    if (response) {
    toast.success("registered successfully")
    }
    
  }

  return (
    <div className='bg-black flex flex-col h-screen w-full justify-center items-center'>

      <div className='flex flex-col'>
        <label htmlFor="username" className='text-lg text-white  font-semibold'>Username</label>
        <input type="text" id="username" value={formData.username} 
        onChange={(e) =>{
            setformData({
              ...formData,
            username:e.target.value
            }) 
        }}
        className='p-2 rounded-lg focus:outline-none'
        />
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
        onClick={onSignUp}
        className='p-2 text-lg font-semibold text-white'>
          SignUp
        </button>
      </div>
    </div>
  )
}

export default Signup;