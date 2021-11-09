import React, { Component } from 'react'
import Button from '../forms/Button'

import { signInWithGoogle } from '../../firebase/utils'

import './styles.scss'

class SignIn extends Component {
  handleSubmit = async (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className='signin'>
        <div className='wrap'>
          <h2>Log In</h2>

          <div className='formWrap'>
            <form onSubmit={this.handleSubmit}>
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
