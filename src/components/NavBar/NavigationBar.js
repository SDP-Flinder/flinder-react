import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

import {ReactComponent as FlinderLogo} from '../assets/icon-display-white.svg';


const Navigationbar = (props) => {
    const clearData = () => {
        props.resetUser();
    }
  return (
    <>
      <Nav>
        <NavLink to='/home'>
            <FlinderLogo className = "icon-display"/>
        </NavLink>
        <Bars />

        {props.user.loggedIn &&
        <NavMenu>
          <NavLink to='/home' activeStyle>
            Home
          </NavLink>

          <NavLink to='/profile' activeStyle>
            Profile
          </NavLink>
        </NavMenu>
        }

        {!props.user.loggedIn ?
          <NavBtn>
          <NavBtnLink to='/'>Sign In</NavBtnLink>
          </NavBtn>: <NavBtn>
          <NavBtnLink to='/' onClick = {clearData}>Log Out</NavBtnLink>
          </NavBtn>}
      </Nav>
    </>
  );
};

export default Navigationbar;
