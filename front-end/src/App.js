import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './routes/index/Dashboard'
import FourOFourError from './routes/not-found/FourOFourError'
import Register from './routes/register/Register';
import Login from './routes/login/login';

const App = () => {
  return (
    <Routes>
      <Route path='*' element={<FourOFourError />} />
      <Route exact path='/my-drive' element={<Dashboard />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

export default App