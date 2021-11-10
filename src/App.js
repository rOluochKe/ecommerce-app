import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { checkUserSession } from './redux/User/user.actions'

// hoc
import WithAuth from './hoc/withAuth'

// layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'

// Pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard'

import './default.scss'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          }
        />
        <Route
          path='/registration'
          element={
            <MainLayout>
              <Registration />
            </MainLayout>
          }
        />
        <Route
          path='/login'
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path='/recovery'
          element={
            <MainLayout>
              <Recovery />
            </MainLayout>
          }
        />
        <Route
          path='/dashboard'
          element={
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          }
        />
      </Routes>
    </div>
  )
}

export default App
