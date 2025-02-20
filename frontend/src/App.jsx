/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import Success from './pages/Success'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route path='/' element={<Start />} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path='/riding' element={<Riding/>} />
          <Route path='/success' element={<Success />} /> {/* Add the Success route */}
          
          <Route path='/captain-signup' element={<CaptainSignup/>} />
          <Route path='/captain-login' element={<CaptainLogin/>} />
          <Route path='/captain-riding' element={<CaptainRiding/>}/>
          <Route path='/home' element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
            } />
            <Route path='user/logout' element={
              <UserProtectWrapper>
                <UserLogout />
              </UserProtectWrapper>
            } />
            <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>

        } />
        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
        </Routes>
      </Router>
    </div>
  )
}

export default App