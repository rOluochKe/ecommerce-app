import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser, resetAllAuthForms } from './../../redux/User/user.actions'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'

const mapState = ({ user }) => ({
  signUpSucess: user.signUpSucess,
  signUpError: user.signUpError,
})

const Signup = (props) => {
  const { signUpSucess, signUpError } = useSelector(mapState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (signUpSucess) {
      resetForm()
      dispatch(resetAllAuthForms())
      navigate('/')
    }
  }, [signUpSucess])

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError)
    }
  }, [signUpError])

  const resetForm = () => {
    setDisplayName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors([])
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    dispatch(
      signUpUser({
        displayName,
        email,
        password,
        confirmPassword,
      })
    )
  }

  const configAuthWrapper = {
    headline: 'Registration',
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            placeholder='Full Name'
            handleChange={(e) => setDisplayName(e.target.value)}
          />

          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            handleChange={(e) => setPassword(e.target.value)}
          />

          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type='submit'>Register</Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default Signup
