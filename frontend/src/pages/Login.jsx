import React from 'react'


export default function Login() {
  return (
    <div class='flex place-content-center justify-center'>
      <div class='flex  bg-blend-color-burn bg-green-100 w-100 place-content-center h-150 mt-20 ' >
        <div>
          <img src='' alt="" />
        </div>
        <form class='flex flex-col gap-4'>
          <div class='text-5xl text-green-700 p-5 flex place-content-center mt-5'>
            Login User
          </div>
          <div>  
          <input placeholder='Enter Username'/>
          </div>
          <div>
          <input placeholder='Enter Password'/>
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
