"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const VerifyEmail = () => {
  const [token, settokem] = useState("");
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);
  const [loader, setloader] = useState(true);

  const verifyUserEmail =async () => {
    console.log("this is verify page");
    
    try {
      setloader(false)
      const res = await axios.post("/api/users/signup",token);
      console.log("🚀 ~ file: page.tsx:15 ~ verifyUserEmail ~ res:", res?.data);
      
      setverified(true)
    } catch (error:any) {
      console.log("🚀 ~ file: page.tsx:18 ~ verifyUserEmail ~ error:", error)
      seterror(true)
      console.log(error.response.data,"message");
      
    }
  }
    
    useEffect(() => {
     const urltoken = window.location.search.split("=")[1];
     console.log("🚀 ~ file: page.tsx:24 ~ useEffect ~ urltoken:", urltoken)
     settokem(urltoken);
     console.log("this runs");
     
    }, [])
    
    useEffect(()=>{
      if (token.length>0 || token==="") {
        verifyUserEmail()
      }
      console.log("this runs");
      
    },[token])
  
  return (
    <>
    {
      loader ? <Loader /> :<div>
      <h2>tojen is {token ? `${token}`:""}</h2>
      {
        verified && 
        <div>
          <h2>Email Verified</h2>
          <Link href={'/login'}>Login</Link>
        </div> 
      }

      {
        error && 
        <div>
          <h2>the error {error}</h2>
        </div>
      }
    </div>
    }
    </>
  )
}

export default VerifyEmail