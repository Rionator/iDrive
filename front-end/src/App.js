import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './routes/index/Dashboard'
import FourOFourError from './routes/not-found/FourOFourError'
import Register from './routes/register/Register';
import Login from './routes/login/login';
import Logout from './routes/logout/logout';
import AdminView from './routes/admin-view/admin-view';
import Auth from './routes/auth/auth';
import UploadFileRoute from './routes/upload-file/upload-file';
import { getIsUser, getIsAdmin } from './auth/auth'
import Navbar from './components/navbar/navbar';
import { UserContext } from './contexts/AuthContext';
import { useMemo } from 'react';

const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const providerIsLogged = useMemo(() => ({ isLogged, setIsLogged }), [isLogged, setIsLogged])
  const providerIsAdmin = useMemo(() => ({ isAdmin, setIsAdmin }), [isAdmin, setIsAdmin])

  useEffect(() => {
    const userInfo = async () => {
      const login = getIsUser();
      const admin = getIsAdmin();
      setIsLogged(login);
      setIsAdmin(admin);
    }
    userInfo();
  }, [])

  return (
    <>
      <UserContext.Provider value={providerIsLogged}>
        <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path='*' element={<FourOFourError />} />
          <Route exact path='/' element={<Auth />} />
          {/* <Route exact path='/MyDrive' element={<Dashboard />} /> */}
          {/* <Route path='upload-file' element={<UploadFileRoute />} /> */}
          <Route exact path="signup" element={<Register />} />
          <Route exact path="signin" element={<Login />} />
          <Route path={"/signout"} element={<Logout />} />
          {
            (isAdmin || isLogged) && (
              <>
                <Route path={"/MyDrive"} element={<Dashboard />} />
              </>
            )
          }
          {/* {
            (isAdmin) && (
              <>
                <Route path={"/AdminView"} element={<AdminView />} />
              </>
            )
          } */}
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App