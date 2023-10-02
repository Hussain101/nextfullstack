"use client"
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Profile = () => {
  const logout = async() =>{
    const router = useRouter()
    try {
      const response = await axios.get("/api/users/logout");
      router.push("/")
    } catch (error) {
      
    }
  }
  return (
    <div className='bg-black'>
      <div>
        <button className='bg-white text-2xl' onClick={logout}>
          Logoout
        </button>
      </div>
    </div>
  )
}

export default Profile;