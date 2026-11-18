import React from 'react'

function ForgotPassword() {
  return (
   <form action="" className="form card">
    <h1>Reset your password</h1>
    <label className="field">
      Enter your Email
      <input type="password" required value={""} minLength={"8"} />
        <button className='btn'>Update password</button>
      </label>
    </form>
  
  )
}

export default ForgotPassword