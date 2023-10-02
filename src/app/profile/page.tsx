"use client"
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
const Profile = () => {
  const router = useRouter()
  const logout = async() =>{
    
    try {
      const response = await axios.get("/api/users/logout");
      console.log("🚀 ~ file: page.tsx:10 ~ logout ~ response:", response)
      router.push("/");
      toast.success("logout succsessfully")

    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='bg-black'>
      <Toaster />
      <div>
        <button className='bg-white text-2xl' onClick={logout}>
          Logoout
        </button>
      </div>
    </div>
  )
}

export default Profile;