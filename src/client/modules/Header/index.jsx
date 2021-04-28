import React from 'react';
import { Link } from 'react-router-dom';

import ProfileCard from './components/ProfileCard';
import ProfileSignin from './components/ProfileSignin';

import logo from 'url:../../public/logo.svg';
import './styles.css';
import useProfileData from '../Auth/hooks/useProfileData';

const Header = () => {
  const profileData = useProfileData({shouldRedirect: false});

  return (<>
    <header>
      <Link to="/">
        <img id="header-logo" src={logo} />
      </Link>
      
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/profile">Profile</Link>
      <Link className="link" to="/rooms">Rooms</Link>
      { 
        profileData.sub !== '' ? <ProfileCard /> : <ProfileSignin />
      }
    </header>
  </>)
}

export default Header