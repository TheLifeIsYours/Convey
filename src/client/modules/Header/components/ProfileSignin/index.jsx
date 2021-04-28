import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css'
const ProfileSignin = () => {
  return (<>
    <Link id="header-profile-signin" to='/auth/signin'>Sign in</Link>
  </>)
}
export default ProfileSignin