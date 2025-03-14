import React, { useState } from 'react'
import login from '../images/login.jpg'



export default function Login() {

  const [isSignup,setIsSignup] = useState(false);
  const [loginUsername,setLoginUsername] = useState("");
  const [loginPassword,setLoginPassword] = useState("");
  const [signupUsername,setSignupUsername] = useState("");
  const [signupPassword,setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignupSubmit = (e) => {

    e.preventDefault();
    console.log(signupUsername,signupPassword,confirmPassword + " signUp sccessfull");
    setIsSignup(true);
    setSignupUsername("");
    setSignupPassword("");
    setConfirmPassword("");


  }

  const handleLoginSubmit = (e) => {

    e.preventDefault();
    console.log(loginUsername,loginPassword+ " login sccessfull");
    setLoginUsername("");
    setLoginPassword("");
  
    
  }

  return (
    <div className='flex justify-center h-screen bg-purple-200'>
      <div className='  bg-white w-[600px]  place-content-center h-[400px] mt-30 shadow-lg rounded-2xl grid grid-cols-2' >
        <div className={`w-full ${isSignup ? 'mt-7': 'mt-14'}`}>
          <img src={login} alt="loginImage"/>
        </div>
        <form className='flex flex-col justify-center px-8'>
          <div className='text-3xl font-bold text-purple-800 p-5 flex text-center mb-6'>
            {isSignup? "Login" : "Sign Up"}
          </div>
          <div>  
          <input value={isSignup? loginUsername : signupUsername} onChange={isSignup? (e) => {setLoginUsername(e.target.value)} : (e) => {setSignupUsername(e.target.value)}} type='text' placeholder='Enter Username' className='w-full p-2 border border-gray-300 rounded-md mb-4'/>
          </div>
          <div>
          <input value={isSignup? loginPassword : signupPassword} onChange={isSignup? (e) => {setLoginPassword(e.target.value)} : (e) => {setSignupPassword(e.target.value)}} type='password' placeholder='Enter Password' className='w-full p-2 border border-gray-300 rounded-md mb-4'/>
          {!isSignup && <input value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} type='password' placeholder='Confirm Password' className='w-full p-2 border border-gray-300 rounded-md mb-4'/>}
          </div>
          <div>
            <button onClick={isSignup? handleLoginSubmit : handleSignupSubmit} type='submit' className='w-full bg-purple-500 rounded-lg text-white py-2 hover:bg-purple-600 transition hover:scale-105'>{isSignup? "Login":"Sign Up"}</button>
          </div>
         <div className='flex justify-end mr-2 mt-3 '><span className='mr-10 mt-0.5 text-gray-500 text-xs'>{isSignup? "Don't have an account?" : "Already have an account? "}</span><button type='button' className='hover:underline hover:text-gray-800 text-gray-700 text-sm' onClick={() => setIsSignup(!isSignup)}>{isSignup? "Sign Up" : "Login"}</button></div>
        </form>
      </div>
    </div>
  )
}
