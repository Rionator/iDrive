import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './routes/index/Dashboard'
import FourOFourError from './routes/not-found/FourOFourError'
import Register from './routes/register/Register';
import Login from './routes/login/login';
import Logout from './routes/logout/logout';
import AdminView from './routes/admin-view/admin-view';
import BlockedView from './routes/blocked-view/blocked-view'
import Auth from './routes/auth/auth';
import { getIsUser, getIsAdmin, getIsBlocked } from './auth/auth'
import Navbar from './components/navbar/navbar';
import { UserContext} from './contexts/AuthContext';
// import { useMemo } from 'react';

const App = () => {
  // const { isAdmin, isLogged } = React.useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false)

  // const providerIsLogged = useMemo(() => ({ isLogged, setIsLogged }), [isLogged, setIsLogged])
  // const providerIsAdmin = useMemo(() => ({ isAdmin, setIsAdmin }), [isAdmin, setIsAdmin])

  useEffect(() => {
    const userInfo = async () => {
      const login = getIsUser();
      const admin = getIsAdmin();
      const blocked = getIsBlocked();
      setIsLogged(login);
      setIsAdmin(admin);
      setIsBlocked(blocked);
    }
    userInfo();
  }, [])

  return (
    <>

      <UserContext.Provider value={{ isAdmin, setIsAdmin, isLogged, setIsLogged }}>
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
          {
            (isBlocked) && (
              <>
                <Route path={"/MyDrive"} element={<BlockedView />} />
              </>
            )
          }
          {
            (isAdmin) && (
              <>
                <Route path={"/AdminView"} element={<AdminView />} />
              </>
            )
          }
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App