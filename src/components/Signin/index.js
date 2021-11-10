import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import {
  emailSignInStart,
  googleSignInStart,
} from './../../redux/User/user.actions'

import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'

import './styles.scss'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

const SignIn = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector(mapState)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (currentUser) {
      resetForm()
      navigate('/')
    }
  }, [currentUser])

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(emailSignInStart({ email, password }))
  }

  const handleGoogleSigIn = () => {
    dispatch(googleSignInStart())
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
              <Button onClick={handleGoogleSigIn}>Sign In with Google</Button>
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
