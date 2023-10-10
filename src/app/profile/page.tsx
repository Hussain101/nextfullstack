"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Loader from "../../components/Loader"
const Profile = () => {
  const router = useRouter()
  const [loader,setLoader] = useState(true);
 const [data,setdata] =useState<any>("")

  const Getdata =async () => {
    try {
      const response = await axios.get("/api/users/me");
      setdata(response.data.data)
      
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:21 ~ Getdata ~ error:", error)
      toast.error(error.message);
      logout()
    }
  }
  const logout = async() =>{
    try {
      const response = await axios.get("/api/users/logout");
      router.push("/");
      toast.success("logout succsessfully")

    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
   Getdata()
  }, [])
  
  return (
    <>
    {
      loader === true ? <Loader />:<div className='bg-black h-screen flex flex-col justify-center items-center'>
      <Toaster />

      <div>
        <p  className='text-white'>Username is <span className='bg-yellow-700 py-2 px-4 my-3 '>{data.username}</span></p>
      </div>
      <div>
        <button className='bg-red-600 text-white p-2 rounded-lg text-2xl' onClick={logout}>
          Logoout
        </button>
      </div>
    </div>
    }
    </>
  )
}

export default Profile;