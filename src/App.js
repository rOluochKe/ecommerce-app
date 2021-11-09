import React, { Component } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'

// layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'

// Pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'

import './default.scss'

const initialState = {
  currentUser: null,
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
    }
  }

  authListener = null

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          })
        })
      }

      this.setState({
        ...initialState,
      })
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser } = this.state

    return (
      <div className='App'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <HomepageLayout currentUser={currentUser}>
                <Homepage />
              </HomepageLayout>
            }
          />
          <Route
            path='/registration'
            element={
              currentUser ? (
                <Navigate to='/' />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path='/login'
            element={
              currentUser ? (
                <Navigate to='/' />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Routes>
      </div>
    )
  }
}

export default App
