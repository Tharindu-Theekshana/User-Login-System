import React, { useState } from 'react'
import login from '../images/login.jpg'


export default function Login() {

  const [isSignup,setIsSignup] = useState(false);

  return (
    <div className='flex justify-center h-screen bg-purple-200'>
      <div className='  bg-white w-[600px]  place-content-center h-[400px] mt-30 shadow-lg rounded-2xl grid grid-cols-2' >
        <div className='w-full mt-5'>
          <img src={login} alt="loginImage"/>
        </div>
        <form className='flex flex-col justify-center px-8'>
          <div className='text-3xl font-bold text-purple-800 p-5 flex text-center mb-6'>
            Login User
          </div>
          <div>  
          <input type='text' placeholder='Enter Username' className='w-full p-2 border border-gray-300 rounded-md mb-4'/>
          </div>
          <div>
          <input type='password' placeholder='Enter Password' className='w-full p-2 border border-gray-300 rounded-md mb-4'/>
          </div>
          <div>
            <button type='submit' className='w-full bg-purple-500 rounded-lg text-white py-2 hover:bg-purple-600 transition hover:scale-105'>Login</button>
          </div>
         <div className='text-sm text-gray-500 flex justify-end mr-2 mt-3 hover:underline hover:text-gray-800'><button>Sign Up</button></div>
        </form>
      </div>
    </div>
  )
}
