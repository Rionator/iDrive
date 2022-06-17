import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken, getIsAdmin, getUserInfos } from '../../auth/auth';
import { UserContext } from '../../contexts/AuthContext';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavText
} from './NavbarElements';

const Navbar = () => {
  const { isLogged, setIsLogged, isAdmin, setIsAdmin, isImpressionate, setIsImpressionate } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const adminCheck = async () => {
      const token = localStorage.getItem('token')
      const admin = getIsAdmin(token)
      setIsAdmin(admin)
    }
    const userInfos = async () => {
      const user = getUserInfos()
      setUsername(user.name)
    }
    userInfos()
    adminCheck()
  }, [setIsAdmin, setUsername])

  const handleLogOut = () => {
    clearToken()
    setIsAdmin(false)
    setIsLogged(false)
  }

  const handleBackToAdmin = () => {
    const token = localStorage.getItem('adminToken')
    localStorage.setItem('token', token)
    localStorage.removeItem('adminToken')
    setIsImpressionate(false)
    window.location.reload(false);
  }
  // const { isImpressionate, setIsImpressionate } = useContext(UserContext)

  // useEffect(() => {
  //   console.log(isImpressionate)
  //   if (isImpressionate) {
  //   }
  // }, [setIsImpressionate, isImpressionate])
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={require('../../images/logo.svg')} alt='logo' />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/About'>
            About
          </NavLink>
          <NavLink to='/ContactUs'>
            Contact Us
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {
          (isLogged) && (
            <NavBtn>
              {
                (isAdmin) && (
                  <NavLink to='/AdminView'>
                    Admin View
                  </NavLink>
                )
              }
              {
                (isImpressionate) && (
                  <NavLink to='/AdminView' onClick={() => handleBackToAdmin()}>
                    Back to AdminView
                  </NavLink>
                )
              }
              <NavBtnLink to='/' onClick={() => handleLogOut()}>Sign Out</NavBtnLink>
              <NavText>
                {username}
              </NavText>
            </NavBtn>
          )
        }
      </Nav>
    </>
  );
};

export default Navbar;
