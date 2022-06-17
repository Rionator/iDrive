import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { getIsAdmin, setTokenWithExpiry } from '../../auth/auth';
import { AdminContext, UserContext } from '../../contexts/AuthContext';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = () => {
  const { isLogged, setIsLogged, isAdmin, setIsAdmin } = useContext(UserContext)

  useEffect(() => {
    const adminCheck = async()=>{
      const token = localStorage.getItem('token')
      const admin = getIsAdmin(token)
      setIsAdmin(admin)
    }
    adminCheck()
  }, [setIsAdmin])

  const handleLogOut = () => {
    setTokenWithExpiry()
    setIsAdmin(false)
    setIsLogged(false)

  }
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
              <NavBtnLink to='/' onClick={() => handleLogOut()}>Sign Out</NavBtnLink>
            </NavBtn>
          )
        }
      </Nav>
    </>
  );
};

export default Navbar;
