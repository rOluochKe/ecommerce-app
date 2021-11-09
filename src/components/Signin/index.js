import React, { Component } from 'react'

import FormInput from '../forms/FormInput'
import Button from '../forms/Button'

import { signInWithGoogle, auth } from '../../firebase/utils'

import './styles.scss'

const initialState = {
  email: '',
  password: '',
}

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = this.state

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({
        ...initialState,
      })
    } catch (err) {
      // console.log(err)
    }
  }

  render() {
    const { email, password } = this.state

    return (
      <div className='signin'>
        <div className='wrap'>
          <h2>Log In</h2>

          <div className='formWrap'>
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type='email'
                name='email'
                value={email}
                placeholder='Email'
                onChange={this.handleChange}
              />

              <FormInput
                type='password'
                name='password'
                value={password}
                placeholder='Password'
                onChange={this.handleChange}
              />

              <Button type='submit'>Login</Button>

              <div className='socialSignin'>
                <div className='row'>
                  <Button onClick={signInWithGoogle}>
                    Sign In with Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn
