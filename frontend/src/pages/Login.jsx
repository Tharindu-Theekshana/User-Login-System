import React from 'react'

export default function Login() {
  return (
    <div>
      <div>
        <form >
          <div>
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
