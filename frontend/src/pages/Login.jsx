import React, { useState } from 'react';
import login from '../images/login.jpg';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  
  const loginSchema = yup.object().shape({
    loginUsername: yup.string().email().required("You must enter email."),
    loginPassword: yup.string().required("You must enter password").min(6, "Password must be at least 6 characters"),
  });

  const signupSchema = yup.object().shape({
    signupUsername: yup.string().email().required("You must enter email."),
    signupPassword: yup.string().required("You must enter password").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup.string().oneOf([yup.ref("signupPassword"), null], "Passwords do not match").required("You must confirm your password."),
  });

  
  const { 
    register: registerLogin, 
    handleSubmit: handleSubmitLogin, 
    formState: { errors: loginErrors } 
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { 
    register: registerSignup, 
    handleSubmit: handleSubmitSignup, 
    formState: { errors: signupErrors },
    reset: resetSignup
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const handleLogin = async (data) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await authService.login({
        loginUsername: data.loginUsername,
        loginPassword: data.loginPassword
      });
      
      console.log('Login response:', response);
      localStorage.setItem('token', response.token);
      

      alert("Logged in successfully!");

      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      await authService.register({
        signupUsername: data.signupUsername,
        signupPassword: data.signupPassword,
        confirmPassword: data.confirmPassword
      });
      
      alert("Signed up successfully! Now you can login.");
      setIsSignup(false); // Switch to login form
      resetSignup(); // Clear signup form
    } catch (error) {
      console.error('Signup Error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Sign up failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center h-screen bg-purple-200'>
      <div className='bg-white w-full max-w-2xl place-content-center h-[400px] mt-30 shadow-lg rounded-2xl grid grid-cols-2'>
        <div className={`w-full ${!isSignup ? 'mt-7' : 'mt-14'}`}>
          <img src={login} alt="loginImage" />
        </div>
        
        {isSignup ? (
          // SIGNUP FORM
          <form className='flex flex-col justify-center px-8 py-6' onSubmit={handleSubmitSignup(handleSignup)}>
            <div className='text-3xl font-bold text-purple-800 p-5 flex text-center mb-6'>
              Sign Up
            </div>
            
            {errorMessage && (
              <div className='text-red-500 text-sm mb-4 text-center'>
                {errorMessage}
              </div>
            )}

            <div>
              <input
                {...registerSignup("signupUsername")}
                type='text'
                placeholder='Enter Email'
                className='w-full p-2 border border-gray-300 rounded-md mb-0.5'
                disabled={isLoading}
              />
              <p className='text-xs text-red-500 ml-3 font-[Opens_Sans]'>
                {signupErrors.signupUsername?.message}
              </p>
            </div>

            <div>
              <input
                {...registerSignup("signupPassword")}
                type='password'
                placeholder='Enter Password'
                className='w-full p-2 border border-gray-300 rounded-md mb-0.5 mt-2'
                disabled={isLoading}
              />
              <p className='text-xs text-red-500 ml-3 font-[Opens_Sans]'>
                {signupErrors.signupPassword?.message}
              </p>
            </div>

            <div>
              <input
                {...registerSignup("confirmPassword")}
                type='password'
                placeholder='Confirm Password'
                className='w-full p-2 border border-gray-300 rounded-md mb-0.5 mt-2'
                disabled={isLoading}
              />
              <p className='text-xs text-red-500 ml-3 font-[Opens_Sans]'>
                {signupErrors.confirmPassword?.message}
              </p>
            </div>

            <div>
              <button
                type='submit'
                className='w-full bg-purple-500 rounded-lg text-white py-2 hover:bg-purple-600 transition hover:scale-105 mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : "Sign Up"}
              </button>
            </div>

            <div className='flex justify-end mr-2 mt-3'>
              <span className='mr-10 mt-0.5 text-gray-500 text-xs'>
                Already have an account?
              </span>
              <button
                type='button'
                className='hover:underline hover:text-gray-800 text-gray-700 text-sm'
                onClick={() => setIsSignup(false)}
                disabled={isLoading}
              >
                Login
              </button>
            </div>
          </form>
        ) : (
          // LOGIN FORM
          <form className='flex flex-col justify-center px-8 py-6' onSubmit={handleSubmitLogin(handleLogin)}>
            <div className='text-3xl font-bold text-purple-800 p-5 flex text-center mb-6'>
              Login
            </div>
            
            {errorMessage && (
              <div className='text-red-500 text-sm mb-4 text-center'>
                {errorMessage}
              </div>
            )}

            <div>
              <input
                {...registerLogin("loginUsername")}
                type='text'
                placeholder='Enter Email'
                className='w-full p-2 border border-gray-300 rounded-md mb-0.5'
                disabled={isLoading}
              />
              <p className='text-xs text-red-500 ml-3 font-[Opens_Sans]'>
                {loginErrors.loginUsername?.message}
              </p>
            </div>

            <div>
              <input
                {...registerLogin("loginPassword")}
                type='password'
                placeholder='Enter Password'
                className='w-full p-2 border border-gray-300 rounded-md mb-0.5 mt-2'
                disabled={isLoading}
              />
              <p className='text-xs text-red-500 ml-3 font-[Opens_Sans]'>
                {loginErrors.loginPassword?.message}
              </p>
            </div>

            <div>
              <button
                type='submit'
                className='w-full bg-purple-500 rounded-lg text-white py-2 hover:bg-purple-600 transition hover:scale-105 mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : "Login"}
              </button>
            </div>

            <div className='flex justify-end mr-2 mt-3'>
              <span className='mr-10 mt-0.5 text-gray-500 text-xs'>
                Don't have an account?
              </span>
              <button
                type='button'
                className='hover:underline hover:text-gray-800 text-gray-700 text-sm'
                onClick={() => setIsSignup(true)}
                disabled={isLoading}
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}