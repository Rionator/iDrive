import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './routes/index/Dashboard'
import FourOFourError from './routes/not-found/FourOFourError'
import Register from './routes/register/Register';
import Login from './routes/login/login';
import Auth from './routes/auth/auth';

const App = () => {
  return (
    <Routes>
      <Route path='*' element={<FourOFourError />} />
      <Route exact path='/' element={<Auth/>}/>
      <Route exact path='/my-drive' element={<Dashboard />} />
      <Route exact path="register" element={<Register />} />
      <Route exact path="login" element={<Login />} />
    </Routes>
  )
}

export default App