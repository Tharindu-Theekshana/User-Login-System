import React, { useState } from 'react'
import login from '../images/login.jpg'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  signupUsername : yup.string().email().required("You must enter email."),
  loginUsername : yup.string().email().required("You must enter email."),
  signupPassword : yup.string().required("You must enter password").min(3),
  confirmPassword : yup.string().oneOf([yup.ref("signupPassword"),null],"Passwords do not match").required("You must confirm your password."),
  loginPassword : yup.string().required("You must enter password").min(3),
  
}); 

export default function Login() {
                                     
                                           
  const {register, handleSubmit,formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  const [isSignup,setIsSignup] = useState(true);
 
  const [loginUsername,setLoginUsername] = useState("");
  const [loginPassword,setLoginPassword] = useState("");
  const [signupUsername,setSignupUsername] = useState("");
  const [signupPassword,setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (e) => {
   
    if(isSignup){
      setLoginUsername(e.target.value);
    }else{
      setSignupUsername(e.target.value);
    }
  }

  const handlePasswordChange = (e) => {

    if(isSignup){
      setLoginPassword(e.target.value);
    }else{
      setSignupPassword(e.target.value);
    }
  }

  
 
  const whenSubmited = (data, e) => {
  e.preventDefault();

  if (!isSignup) {
  
    console.log("Sign Up Data:", {
      signupUsername: data.signupUsername,
      signupPassword: data.signupPassword,
      confirmPassword: data.confirmPassword});
    setIsSignup(true);
  } else {
    console.log(data.loginUsername, data.loginPassword, "login successful");
  }
 
};
  

  return (
    <div className='flex justify-center h-screen bg-purple-200'>
      <div className='  bg-white w-[600px]  place-content-center h-[400px] mt-30 shadow-lg rounded-2xl grid grid-cols-2' >
        <div className={`w-full ${isSignup ? 'mt-7': 'mt-14'}`}>
          <img src={login} alt="loginImage"/>
        </div>
        <form className='flex flex-col justify-center px-8'  onSubmit={handleSubmit(whenSubmited)}>
          <div className='text-3xl font-bold text-purple-800 p-5 flex text-center mb-6'>
            {isSignup? "Login" : "Sign Up"}
          </div>
          <div>  
          <input 
          onChange={handleUsernameChange} 
          {...register(isSignup? "loginUsername" : "signupUsername")} 
          type='text' placeholder='Enter Username' 
          className='w-full p-2 border border-gray-300 rounded-md mb-0.5'/>
          <p className='text-xs text-red-500 ml-3 font-[Opens_Sans]'>{isSignup? errors.loginUsername?.message : errors.signupUsername?.message}</p>
          </div>
          <div>
          <input 
          onChange={handlePasswordChange} 
          {...register(isSignup? "loginPassword" : "signupPassword")} 
          type='password' placeholder='Enter Password' 
          className='w-full p-2 border border-gray-300 rounded-md mb-0.5 mt-2'/>
          <p className='text-xs text-red-500 ml-3 font-[Opens_Sans]'>{isSignup? errors.loginPassword?.message : errors.signupPassword?.message}</p>
          {!isSignup && 
          <input 
          onChange={(e) => {setConfirmPassword(e.target.value)}} 
          {...register("confirmPassword")} type='password' 
          placeholder='Confirm Password' 
          className='w-full p-2 border border-gray-300 rounded-md mb-0.5 mt-2'/>}
          {!isSignup &&<p className='text-xs text-red-500 ml-3 font-[Opens_Sans]'>{errors.confirmPassword?.message}</p>}
          </div>
          <div>
            <button type='submit' className='w-full bg-purple-500 rounded-lg text-white py-2 hover:bg-purple-600 transition hover:scale-105 mt-2'>{isSignup? "Login":"Sign Up"}</button>
          </div>
         <div className='flex justify-end mr-2 mt-3 '><span className='mr-10 mt-0.5 text-gray-500 text-xs'>{isSignup? "Don't have an account?" : "Already have an account? "}</span><button type='button' className='hover:underline hover:text-gray-800 text-gray-700 text-sm' onClick={() => setIsSignup(!isSignup)}>{isSignup? "Sign Up" : "Login"}</button></div>
        </form>
      </div>
    </div>
  )
}
