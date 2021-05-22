import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../hoc/recoil/userInfoState';

import './styles.css'

const ProfileCard = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  return (<section id="header-profile-card-container">
    <Link id="header-profile-card" to='/profile'>
      <img id="header-profile-card-image" src={userInfo.picture}/>
      <div id="header-profile-card-name">{userInfo.display_name}</div>
    </Link>
    <section id="header-profile-card-options">
      <Link className="header-profile-card-options option" to="/auth/signout">Sign out</Link>
      <Link className="header-profile-card-options option" to="/profile/settings">Settings</Link>
    </section>
  </section>)
}

export default ProfileCard