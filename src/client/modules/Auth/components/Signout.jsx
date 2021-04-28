import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'

import { userInfoState } from '../../../hoc/recoil/userInfoState'

const Signout = () => {
  const history = useHistory()
  const resetUserInfo = useResetRecoilState(userInfoState);

  useEffect(async () => {
    localStorage.removeItem("loginProvider");
    localStorage.removeItem("access_token");
    resetUserInfo();
    
    fetch('/auth/signout');

    history.push('/');
  }, [])

  return(<h1>Signing out</h1>)
}

export default Signout