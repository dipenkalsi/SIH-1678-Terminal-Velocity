import React from 'react'
import { SignIn, SignUp } from '@clerk/nextjs'
const SignInComponent = () => {
  return (
    <div className='flex'>
      <SignIn routing='hash'/>
      <SignUp routing='hash'/>
    </div>
  )
}

export default SignInComponent
