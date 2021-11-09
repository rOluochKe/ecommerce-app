import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'

import { signInWithGoogle, auth } from '../../firebase/utils'

import './styles.scss'

const SignIn = (props) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await auth.signInWithEmailAndPassword(email, password)
      resetForm()
      navigate('/')
    } catch (err) {
      // console.log(err)
    }
  }

  const configAuthWrapper = {
    headline: 'Login',
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type='submit'>Login</Button>

          <div className='socialSignin'>
            <div className='row'>
              <Button onClick={signInWithGoogle}>Sign In with Google</Button>
            </div>
          </div>

          <div className='links'>
            <Link to='/recovery'>Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default SignIn
