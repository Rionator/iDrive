import React from 'react';
import { useContext } from 'react';
import { setTokenWithExpiry } from '../../auth/auth';
import { UserContext } from '../../contexts/AuthContext';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = ({ isAdmin, setIsAdmin }) => {
  const {isLogged, setIsLogged} = useContext(UserContext)
  const handleLogOut = () => {
    setTokenWithExpiry()
    setIsLogged(false)
    setIsAdmin(false)

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
              <NavBtnLink to='/' onClick={()=> handleLogOut()}>Sign Out</NavBtnLink>
            </NavBtn>
          )
        }
      </Nav>
    </>
  );
};

export default Navbar;
